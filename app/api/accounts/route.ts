import { NextRequest } from "next/server";

import { getAccountsFromPlaid } from "@/services/plaid/getAccountV2";

import { withAuth } from "@/lib/protected";

// Utils
import { getServerErrorMessage } from "@/utils/api-helpers/errors/getServerErrorMessage";
import {
  SuccessResponse,
  ErrorResponse,
  FailResponse,
} from "@/utils/api-helpers/api-responses/response";
import { updateAccounts } from "@/utils/prisma/accounts/updateAccountsV2";
import { getMemberByUserId } from "@/utils/prisma/household/household";

/**
 * Handles the GET request for retrieving accounts associated with a household.
 *
 * This function is wrapped with authentication middleware (`withAuth`) to ensure
 * that the request is authenticated. It performs the following steps:
 *
 * 1. Extracts the `household_id` from the request body.
 * 2. Fetches items associated with the given `household_id` using `getItemByHouseholdId`.
 * 3. If no items are found, returns a 404 response with an appropriate error message.
 * 4. Retrieves accounts from Plaid for the fetched items using `getAccountsFromPlaid`.
 * 5. Updates the accounts in the database using `updateAccounts`.
 * 6. If the accounts are successfully updated, returns a success response with the updated accounts.
 * 7. Handles any errors that occur during the process and returns an appropriate error response.
 *
 * @param req - The incoming `NextRequest` object.
 * @returns A `Response` object containing the result of the operation:
 * - Success: A JSON object with the updated accounts and a success message.
 * - Failure: An error response with an appropriate status code and message.
 *
 * @throws Will throw an error if there is an issue with fetching items, retrieving accounts,
 *         updating accounts, or any other server-side error.
 */
export async function GET(req: NextRequest) {
  return withAuth(req, async (request, user) => {
    try {
      const member = await getMemberByUserId(user.id);
      if (!member) return FailResponse("Failed to get member from user", 404);

      const { household } = member;
      const items = household?.items;

      if (!items || items.length === 0) {
        console.error("No items found for the given household ID", items);
        return FailResponse("No items found for the given household ID", 404);
      }

      /**
       *  Go through each item and fetch the accounts
       */
      const accounts = await getAccountsFromPlaid(items);

      /**
       *  Store the accounts in the database
       */
      const updatedAccounts = await updateAccounts(
        accounts,
        household?.accounts || []
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
