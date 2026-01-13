import { NextRequest } from "next/server";
import { client } from "@/config/plaidClient";
import { withAuth } from "@/lib/protected";

// Utils
import { getItemWithMemberAndInstitutionId } from "@/utils/drizzle/item/getItem";
import {
  FailResponse,
  SuccessResponse,
  ErrorResponse,
} from "@/utils/api-helpers/api-responses/response";
import { addItem } from "@/utils/drizzle/item/addItem";
import {
  getHouseholdIdByMembership,
  hasHouseholdPermission,
} from "@/utils/drizzle/household-member/members";
import { addPlaidMetadataAccounts } from "@/utils/prisma/accounts/addAccounts";

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
    const userId = user.id;

    const { member_id: memberId, metadata, public_token: publicToken }: ExchangeTokenRequestBody =
      await request.json();

    if (
      !memberId ||
      !publicToken ||
      !metadata?.institution ||
      !metadata?.accounts?.length
    )
      return FailResponse("Key fields are missing", 400);

    try {
      // ----- Get household from the member_id -----
      const householdId = await getHouseholdIdByMembership(memberId);
      if (!householdId)
        return FailResponse("Could not match member to household", 400);

      // ----- Is member authorized -----
      const allowed = await hasHouseholdPermission({
        userId,
        householdId,
      });
      if (!allowed) return FailResponse("Permission denied", 403);

      // ----- Get Item From the database -----
      const itemDB = await getItemWithMemberAndInstitutionId({
        memberId,
        institutionId: metadata?.institution?.institution_id,
      });

      if (itemDB)
        return FailResponse(
          "This institution is already linked for this member",
          400
        );

      // ################################################ EXCHANGE TOKEN ##############################################

      /**
       * After exchanging the token we have to make sure that the item gets stored to the Database because it will contain
       * the access_token. Without the acccess token we can not delete the item from our end.
       */
      const response = await client.itemPublicTokenExchange({ public_token: publicToken });
      if (!response)
        return FailResponse("There was en error when adding item", 500);
      const itemId = response.data.item_id;

      try {
        // ------ Add item to the database ------
        await addItem({
          memberId,
          userId,
          householdId,
          plaidItem: response.data,
        });
      } catch (error) {
        return ErrorResponse("Failed to link institution", 500);
      }

      // ----- Add accounts -----
      try {
        await addPlaidMetadataAccounts({
          itemId,
          plaidAccounts: metadata.accounts,
          householdId,
          memberId,
        });
      } catch (accountError) {
        console.warn(
          "Initial account sync failed for item_id:",
          itemId,
          accountError
        );
        console.error(accountError, { itemId, memberId });
      }

      // Success — access_token is safely stored
      return SuccessResponse(
        { itemId },
        "Institution linked successfully. Account details will update soon."
      );
    } catch (error) {
      return ErrorResponse(error, 500);
    }
  });
}
