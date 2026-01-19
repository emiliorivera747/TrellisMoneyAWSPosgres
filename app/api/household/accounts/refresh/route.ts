// app/api/household/accounts/refresh/route.ts
import { NextRequest } from "next/server";
import { withAuth } from "@/lib/protected"; // your auth wrapper
import { getAccountsFromPlaidWithItems } from "@/services/plaid/getAccountV2";
import { updateAccounts } from "@/utils/drizzle/accounts/updateAccounts";

import {
  SuccessResponse,
  ErrorResponse,
  FailResponse,
} from "@/utils/api-helpers/api-responses/response";
import { getServerErrorMessage } from "@/utils/api-helpers/errors/getServerErrorMessage";

import { getMembers } from "@/utils/drizzle/household-member/members";
import { getItemsByHouseholdMemberIds } from "@/utils/drizzle/item/getItem";
import { getAccountsFromItems } from "@/utils/drizzle/accounts/getAccount";

/**
 * POST /api/household/accounts/refresh
 *
 * Refreshes Plaid accounts for the authenticated user's entire household.
 * - Fetches all relevant items/connections from the household
 * - Calls Plaid to get fresh account data
 * - Updates the database
 * - Returns quick success with metadata (not the full accounts list)
 */
export async function POST(req: NextRequest) {
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
       * Get the accounts from the database
       */
      const accountsDB = await getAccountsFromItems(items);

      /**
       * Get Plaid accounts
       */
      const plaidAccounts = await getAccountsFromPlaidWithItems(items);
      if (plaidAccounts.length === 0)
        return FailResponse("No accounts found", 404);

      // 4. Update accounts in DB (your existing utility - should be idempotent)
      const updatedAccounts = await updateAccounts(plaidAccounts, accountsDB);

      // 5. Return quick success response (do NOT return full account list here)
      return SuccessResponse(
        {
          refreshedAccountsCount: Array.isArray(updatedAccounts)
            ? updatedAccounts.length
            : 0,
          refreshedItemCount: items.length,
          refreshedAt: new Date().toISOString(),
        },
        "Household accounts refreshed successfully"
      );
    } catch (error) {
      return ErrorResponse(getServerErrorMessage(error));
    }
  });
}
