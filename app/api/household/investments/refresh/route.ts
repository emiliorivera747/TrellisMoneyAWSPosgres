// app/api/household/holdings/refresh/route.ts
import { NextRequest } from "next/server";
import { withAuth } from "@/lib/protected"; // your auth wrapper

// Drizzle
import { getItemsByUserId } from "@/utils/drizzle/item/getItem";
import { getAccountsFromItems } from "@/utils/drizzle/accounts/getAccount";

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
      /**
       * Get items from household member ids
       */
      const items = await getItemsByUserId(user.id);
      if (!items)
        return FailResponse("No connected financial institutions found", 404);

      /**
       * Get the accounts
       */
      const accountsDB = await getAccountsFromItems(items);

      /**
       * Get Plaid holdings
       */
      const plaidHoldingsResponses = await refreshHouseholdHoldings({
        items,
        accountsDB,
        timestamp: "",
        holdingsDB: [],
      });
      if (!plaidHoldingsResponses)
        return FailResponse("Failed to get Holdings from Plaid", 404);

      const { accountsUpdated, holdingsUpdated, securitiesUpdated } =
        plaidHoldingsResponses.stats;

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
