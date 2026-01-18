import { NextRequest } from "next/server";

import { getAccountsFromPlaidWithItems } from "@/services/plaid/getAccountV2";

import { withAuth } from "@/lib/protected";

// Utils
import { getServerErrorMessage } from "@/utils/api-helpers/errors/getServerErrorMessage";
import {
  SuccessResponse,
  ErrorResponse,
  FailResponse,
} from "@/utils/api-helpers/api-responses/response";
import { updateAccounts } from "@/utils/drizzle/accounts/updateAccounts";
import { getItemsWithUserId } from "@/utils/drizzle/item/getItem";

/**
 * Handles authenticated GET requests to retrieve and update household accounts.
 *
 * Steps:
 * 1. Fetches the household and its items using the authenticated user ID.
 * 2. Returns 404 if no household or items are found.
 * 3. Retrieves accounts from Plaid for the items.
 * 4. Updates the accounts in the database.
 * 5. Returns updated accounts on success or an error response on failure.
 *
 * @param req - Incoming `NextRequest`.
 * @returns A `Response` with updated accounts or an error message.
 */
export async function GET(req: NextRequest) {
  return withAuth(req, async (request, user) => {
    try {
      
      const items = await getItemsWithUserId(user.id);
      if (!items) return FailResponse("Failed to get items with user id", 404);

      /**
       *  Go through each item and fetch the accounts
       */
      const plaidAccounts = await getAccountsFromPlaidWithItems(items);

      /**
       *  Store the accounts in the database
       */
      const updatedAccounts = await updateAccounts(
        plaidAccounts,
        accountsDB 
      );

      if (!updatedAccounts)
        return FailResponse("Failed to update account", 500);

      return SuccessResponse(
        { accounts: updatedAccounts },
        "Retrieved accounts"
      );
    } catch (error) {
      return ErrorResponse(getServerErrorMessage(error));
    }
  });
}
