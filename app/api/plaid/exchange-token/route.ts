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
import { authorizeHouseholdAction } from "@/utils/prisma/user/user-household/userHousehold";
import { getHouseholdIdByMembership } from "@/utils/prisma/household-member/members";

// Types
import { ExchangeTokenRequestBody } from "@/types/plaid";

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
      if (!household_id) {
        logError("Household ID is missing");
        return FailResponse("Household ID is missing", 400);
      }

      // ----- Is the user allowed to make changes to household? -----
      const allowed = await authorizeHouseholdAction({
        user_id,
        household_id,
      });
      if (!allowed) return FailResponse("Permission denied", 403);

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

      // ------ Add item to the database ------
      await addItem({
        member_id,
        user_id,
        household_id,
        item_id,
        access_token,
        request_id,
      });

      // ----- Match accounts to the item -----
      await addAccounts({
        user_id,
        item_id,
        accounts: metadata.accounts,
        household_id,
        member_id,
      });

      return SuccessResponse({ item_id }, "Item was successfully added!");
    } catch (error) {
      console.error(error);
      return ErrorResponse(error, 500);
    }
  });
}
