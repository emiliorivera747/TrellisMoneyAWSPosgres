import { NextRequest } from "next/server";
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

// Services
import { exchangePublicToken } from "@/services/stripe/token-exchange";

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

    const {
      member_id: householdMemberId,
      metadata,
      public_token: publicToken,
    }: ExchangeTokenRequestBody = await request.json();

    const hasMissingKeys =
      !householdMemberId ||
      !publicToken ||
      !metadata?.institution ||
      !metadata?.accounts?.length;

    if (hasMissingKeys) return FailResponse("Key fields are missing", 400);

    try {
      // ----- Get household from the member_id -----
      const householdId = await getHouseholdIdByMembership(householdMemberId);
      if (!householdId)
        return FailResponse("Could not match member to household", 400);

      // ----- Is member authorized -----
      const allowed = await hasHouseholdPermission({
        userId,
        householdId,
      });
      if (!allowed) return FailResponse("Permission denied", 403);

      // ----- Validate institution_id -----
      const institutionId = metadata?.institution?.institution_id;
      if (!institutionId) {
        return FailResponse("Institution ID is required", 400);
      }

      // ----- Get Item From the database -----
      const itemDB = await getItemWithMemberAndInstitutionId({
        memberId: householdMemberId,
        institutionId,
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
      const response = await exchangePublicToken(publicToken);

      if (!response || !response.data)
        return FailResponse("Error exchanging token with Plaid", 500);

      const itemId = response.data.item_id;
      if (!itemId)
        return FailResponse(
          "Invalid response from Plaid: missing item_id",
          500
        );

      // Validate required account fields before proceeding
      const invalidAccounts = metadata.accounts.filter(
        (acc) => !acc.id || !acc.name || !acc.type
      );
      if (invalidAccounts.length > 0)
        return FailResponse(
          "One or more accounts are missing required fields (id, name, type)",
          400
        );

      // ------ Add item to the database ------
      const createdItem = await addItem({
        userId,
        plaidItem: response.data,
      });

      if (!createdItem)
        return FailResponse("Failed to save item to database", 500);

      // ----- Add accounts -----
      await addPlaidMetadataAccounts({
        itemId,
        plaidAccounts: metadata.accounts,
        householdMemberId,
      });

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
