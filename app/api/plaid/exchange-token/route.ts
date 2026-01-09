import { NextRequest } from "next/server";
import { client } from "@/config/plaidClient";
import { withAuth } from "@/lib/protected";

// Utils
import { getItemWithMemberAndInstitutionId } from "@/utils/prisma/item/getItem";
import {
  FailResponse,
  SuccessResponse,
  ErrorResponse,
} from "@/utils/api-helpers/api-responses/response";
import { addItem } from "@/utils/prisma/item/addItem";
import { addAccounts } from "@/utils/prisma/accounts/addAccounts";
import { logError } from "@/utils/api-helpers/errors/logError";
import {
  getHouseholdIdByMembership,
  hasHouseholdPermission,
} from "@/utils/prisma/household-member/members";

// Types
import { ExchangeTokenRequestBody } from "@/types/services/plaid/plaid";

/**
 * Handles the POST request to exchange a public token for an access token
 * and store the item in the database.
 *
 * @param req - The incoming request object
 * @returns A JSON response with the access token or an error message
 */
export async function POST(req: NextRequest) {
  return withAuth(req, async (request, user) => {
    const user_id = user.id;

    const { member_id, metadata, public_token }: ExchangeTokenRequestBody =
      await request.json();

    if (
      !member_id ||
      !public_token ||
      !metadata?.institution ||
      !metadata?.accounts?.length
    ) {
      logError("Key fields are missing");
      return FailResponse("Key fields are missing", 400);
    }

    try {
      
      // ----- Get household from the member_id -----
      const household_id = await getHouseholdIdByMembership(member_id);
      if (!household_id)
        return FailResponse("Could not match member to household", 400);

      // ----- Is member authorized -----
      const allowed = await hasHouseholdPermission({ user_id, household_id });
      if (!allowed) {
        logError("Permission denied");
        return FailResponse("Permission denied", 403);
      }

      // ----- Get Item From the database -----
      const itemDB = await getItemWithMemberAndInstitutionId({
        member_id,
        institution_id: metadata?.institution?.institution_id,
      });

      if (itemDB) {
        logError("This institution is already linked for this member");
        return FailResponse(
          "This institution is already linked for this member",
          400
        );
      }

      // ----- Exchange the public token for an access token -----
      const response = await client.itemPublicTokenExchange({ public_token });
      const { access_token, item_id, request_id } = response.data;

      try {
        // ------ Add item to the database ------
        await addItem({
          member_id,
          user_id,
          household_id,
          item_id,
          access_token,
          request_id,
        });
      } catch (error) {
        console.error("Failed to save Plaid Item", error);
        return ErrorResponse("Failed to link institution", 500);
      }

      // ----- Add accounts -----
      try {
        await addAccounts({
          user_id,
          item_id,
          accounts: metadata.accounts,
          household_id,
          member_id,
        });
      } catch (accountError) {
        console.warn(
          "Initial account sync failed for item_id:",
          item_id,
          accountError
        );
        console.error(accountError, { item_id, member_id });
      }

      // Success — access_token is safely stored
      return SuccessResponse(
        { item_id },
        "Institution linked successfully. Account details will update soon."
      );
    } catch (error) {
      console.error(error);
      return ErrorResponse(error, 500);
    }
  });
}
