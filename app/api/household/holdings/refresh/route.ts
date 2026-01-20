// app/api/household/holdings/refresh/route.ts
import { NextRequest } from "next/server";
import { withAuth } from "@/lib/protected"; // your auth wrapper

import { getHoldingsFromPlaidWithItems } from "@/services/plaid/holdings/getHoldingsV2";
import { updateHoldings } from "@/utils/drizzle/holdings/updateHoldings";

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
       * Get the member rows
       */
      const memberRows = await getMembers(user.id);
      if (memberRows.length === 0)
        return FailResponse("No household membership found", 404);

      /**
       * Get the householdMemberIds
       */
      const householdMemberIds = memberRows.map((m) => m.householdMemberId);
      console.log(householdMemberIds);

      /**
       * Get items from household member ids
       */
      const items = await getItemsByHouseholdMemberIds(householdMemberIds);
      if (items.length === 0)
        return FailResponse("No connected financial institutions found", 404);

      /**
       * Get the accounts from the database (needed for mapping accountId to householdMemberId)
       */
      const accountsDB = await getAccountsFromItems(items);

      /**
       * Get Plaid holdings
       */
      const plaidHoldingsResponses = await getHoldingsFromPlaidWithItems(items);
      console.log("Plaid Holdings", plaidHoldingsResponses);
      
      // Flatten holdings from all responses
      const allPlaidHoldings = plaidHoldingsResponses.flatMap(
        (response) => response.holdings || []
      );
      
      if (allPlaidHoldings.length === 0)
        return FailResponse("No holdings found", 404);

      // 4. Update holdings in DB (your existing utility - should be idempotent)
      const updatedHoldings = await updateHoldings(
        plaidHoldingsResponses,
        accountsDB
      );

      // 5. Return quick success response (do NOT return full holdings list here)
      return SuccessResponse(
        {
          refreshedHoldingsCount: Array.isArray(updatedHoldings)
            ? updatedHoldings.length
            : 0,
          refreshedItemCount: items.length,
          refreshedAt: new Date().toISOString(),
        },
        "Household holdings refreshed successfully"
      );
    } catch (error) {
      return ErrorResponse(getServerErrorMessage(error));
    }
  });
}
