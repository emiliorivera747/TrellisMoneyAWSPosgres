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
import { getAccountsFromItems } from "@/utils/drizzle/accounts/getAccount";
import { getItemsWithUserId } from "@/utils/drizzle/item/getItem";

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
      const items = await getItemsWithUserId(user.id);
      if (!items) return FailResponse("Could not find the users items", 404);

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
      return ErrorResponse(error);
    }
  });
}
