import { NextRequest } from "next/server";
import { client } from "@/config/plaidClient";

import { withAuth } from "@/lib/protected";

// Utils
import { getItemByUserAndInstitutionId } from "@/utils/prisma/item/getItem";
import {
  FailResponse,
  SuccessResponse,
  ErrorResponse,
} from "@/utils/api-helpers/api-responses/response";
import { getUserHouseholdMembership } from "@/utils/prisma/household-member/members";
import { addItem } from "@/utils/prisma/item/addItem";
import { addAccounts } from "@/utils/prisma/accounts/addAccounts";
import { logError } from "@/utils/api-helpers/errors/logError";
import { PlaidLinkOnSuccessMetadata } from "react-plaid-link";

interface ExchangeTokenRequestBody {
  public_token: string;
  metadata: PlaidLinkOnSuccessMetadata;
  user_id: string;
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
    const { public_token, metadata, user_id }: ExchangeTokenRequestBody =
      await request.json();
    const institution_id = metadata.institution?.institution_id;
    if (!institution_id) return FailResponse("Institution ID is missing", 400);

    try {
      // ----- Get Item From the database -----
      const itemDB = await getItemByUserAndInstitutionId(
        user_id,
        institution_id
      );

      if (itemDB)
        return FailResponse(
          "Item already exists for this user and institution",
          400
        );

      // ----- Exchange the public token for an access token -----
      const response = await client.itemPublicTokenExchange({ public_token });
      const { access_token } = response.data;

      // ----- Retrieve item details using the access token -----
      const item = await client.itemGet({ access_token });

      // ----- Retreive the membership -----
      const membership = await getUserHouseholdMembership(user_id);
      if (!membership) {
        logError("Household membership not found");
        return FailResponse("Household membership not found", 400);
      }

      const household_id = membership.household_id;

      // ------ Add the new item to the database ------
      const addedItem = await addItem(
        user_id,
        item,
        access_token,
        household_id
      );
      if (!addedItem) {
        logError("Failed to add item");
        return FailResponse("Failed to add household", 400);
      }

      // ----- Match the accounts to the item -----
      const addedAccount = await addAccounts(
        user_id,
        item.data.item.item_id,
        metadata.accounts,
        household_id
      );
      if (!addedAccount) {
        logError("Failed to add accounts");
        return FailResponse("Failed to add accounts", 400);
      }

      return SuccessResponse({ access_token }, "Item was successfully added!");
    } catch (error) {
      console.error(error);
      return ErrorResponse(error, 500);
    }
  });
}
