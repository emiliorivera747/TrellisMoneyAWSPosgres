import { NextRequest } from "next/server";
import { withAuth } from "@/lib/protected";

// Utils
import { getServerErrorMessage } from "@/utils/api-helpers/errors/getServerErrorMessage";
import {
  SuccessResponse,
  ErrorResponse,
  FailResponse,
} from "@/utils/api-helpers/api-responses/response";

import { getMembers } from "@/utils/drizzle/household-member/members";
import { getItemsByHouseholdMemberIds } from "@/utils/drizzle/item/getItem";
import { getAccountsFromItems } from "@/utils/drizzle/accounts/getAccount";

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
      /**
       * Get the member rows
       */
      const memberRows = await getMembers(user.id);
      if (memberRows.length === 0)
        return FailResponse("No household membership found", 404);

      /**
       * Get the householdMemberIds
       */
      const householdMemberIds = memberRows.map((m) => m.householdMemberId);

      /**
       * Get items from household member ids
       */
      const items = await getItemsByHouseholdMemberIds(householdMemberIds);
      if (items.length === 0)
        return FailResponse("No connected financial institutions found", 404);

      /**
       * Get Accounts
       */
      const accountsDb = getAccountsFromItems(items);
      if (!accountsDb) return FailResponse("Failed to update account", 500);

      return SuccessResponse({ accounts: accountsDb }, "Retrieved accounts");
    } catch (error) {
      return ErrorResponse(getServerErrorMessage(error));
    }
  });
}
