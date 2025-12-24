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
import { PlaidLinkOnSuccessMetadata } from "react-plaid-link";
import { canUserEditMembersHousehold } from "@/utils/prisma/user/user-household/userHousehold";

interface ExchangeTokenRequestBody {
  public_token: string;
  metadata: PlaidLinkOnSuccessMetadata;
  member_id: string;
}
/**
 * Handles the POST request to exchange a public token for an access token
 * and store the item in the database.
 *
 * @param req - The incoming request object
 * @returns A JSON response with the access token or an error message
 */
export async function POST(req: NextRequest) {
  return withAuth(req, async (request, user) => {
    const { public_token, metadata, member_id }: ExchangeTokenRequestBody =
      await request.json();
    const institution_id = metadata.institution?.institution_id;
    if (!institution_id) return FailResponse("Institution ID is missing", 400);
    if (!public_token) return FailResponse("Public token is missing", 400);
    if (!metadata) return FailResponse("Metadata is missing", 400);
    if (!member_id) return FailResponse("Member ID is missing", 400);
    const user_id = user.id;

    try {
      const { allowed, household_id } = await canUserEditMembersHousehold({
        user_id,
        member_id,
      });

      // ----- Does the user have permission -----
      if (!allowed) return FailResponse("Permission denied", 403);
      if (!household_id) return FailResponse("Household not found", 500);

      // ----- Get Item From the database -----
      const itemDB = await getItemWithMemberAndInstitutionId({
        member_id,
        institution_id,
      });

      if (itemDB)
        return FailResponse(
          "This institution is already linked for this member",
          400
        );

      // ----- Exchange the public token for an access token -----
      const response = await client.itemPublicTokenExchange({ public_token });
      const { access_token } = response.data;

      // ----- Retrieve item details using the access token -----
      const item = await client.itemGet({ access_token });

      // ------ Add the new item to the database ------
      const addedItem = await addItem({
        member_id,
        user_id,
        household_id,
        item,
        access_token,
      });

      if (!addedItem) {
        logError("Failed to add item");
        return FailResponse("Failed to add item", 500);
      }

      // ----- Match the accounts to the item -----
      const addedAccount = await addAccounts({
        user_id,
        item_id: item.data.item.item_id,
        accounts: metadata.accounts,
        household_id,
        member_id,
      });

      if (addedAccount.length === 0)
        logError(
          "No accounts returned in Plaid Link metadata (expected for some products)"
        );

      return SuccessResponse({}, "Item was successfully added!");
    } catch (error) {
      console.error(error);
      return ErrorResponse(error, 500);
    }
  });
}
