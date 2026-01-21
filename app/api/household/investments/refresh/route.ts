// app/api/household/holdings/refresh/route.ts
import { NextRequest } from "next/server";
import { withAuth } from "@/lib/protected"; // your auth wrapper

// Drizzle
import { getItemsByUserId } from "@/utils/drizzle/item/getItem";
import { getAccountsFromItems } from "@/utils/drizzle/accounts/getAccount";
import { getHoldingsByAccounts } from "@/utils/drizzle/holdings/getHoldings";

// Utils
import {
  SuccessResponse,
  ErrorResponse,
  FailResponse,
} from "@/utils/api-helpers/api-responses/response";
import { getServerErrorMessage } from "@/utils/api-helpers/errors/getServerErrorMessage";
import { refreshHouseholdHoldings } from "@/utils/drizzle/investments/getInvestments";

/**
 * POST /api/household/holdings/refresh
 *
 * Refreshes Plaid holdings for the authenticated user's entire household.
 * - Fetches all relevant items/connections from the household
 * - Calls Plaid to get fresh holdings data
 * - Updates the database
 * - Returns quick success with metadata (not the full holdings list)
 */
export async function POST(req: NextRequest) {
  return withAuth(req, async (request, user) => {
    try {
      // Step 1: Get items (sequential - needed first)
      const items = await getItemsByUserId(user.id);
      if (!items || items.length === 0) {
        return FailResponse("No connected financial institutions found", 404);
      }

      // Step 2: Get accounts first (needed for holdings query)
      const accountsDB = await getAccountsFromItems(items);

      // Step 3: Get holdings for these accounts
      const holdingsDB = await getHoldingsByAccounts(accountsDB);

      // Step 4: Refresh from Plaid and update database
      const result = await refreshHouseholdHoldings({
        items,
        accountsDB: accountsDB || [],
        timestamp: "",
        holdingsDB: holdingsDB || [],
      });

      const { accountsUpdated, holdingsUpdated, securitiesUpdated } =
        result.stats;

      // 5. Return quick success response (do NOT return full holdings list here)
      return SuccessResponse(
        {
          refreshedHoldingsCount: holdingsUpdated,
          refreshedAccountsCount: accountsUpdated,
          refreshedSecurityCount: securitiesUpdated,
          refreshedAt: new Date().toISOString(),
        },
        "Household holdings refreshed successfully"
      );
    } catch (error) {
      return ErrorResponse(getServerErrorMessage(error));
    }
  });
}
