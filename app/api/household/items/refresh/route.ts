// app/api/household/items/refresh/route.ts
import { NextRequest } from "next/server";
import { withAuth } from "@/lib/protected";

import { getItemsFromPlaid } from "@/services/plaid/items/items";
import { updateItemsWithPlaidItems } from "@/utils/drizzle/item/updateItems";

import {
  SuccessResponse,
  ErrorResponse,
  FailResponse,
} from "@/utils/api-helpers/api-responses/response";
import { getServerErrorMessage } from "@/utils/api-helpers/errors/getServerErrorMessage";

import { getMembers } from "@/utils/drizzle/household-member/members";
import { getItemsByHouseholdMemberIds } from "@/utils/drizzle/item/getItem";

/**
 * POST /api/household/items/refresh
 *
 * Refreshes Plaid items for the authenticated user's entire household.
 * - Fetches all relevant items/connections from the household
 * - Calls Plaid to get fresh item data
 * - Updates the database
 * - Returns quick success with metadata (not the full items list)
 */
export async function POST(req: NextRequest) {
  return withAuth(req, async (request, user) => {
    try {
      /**
       * Get the member rows
       */
      const memberRows: { householdMemberId: string }[] = await getMembers(
        user.id
      );
      if (!memberRows || memberRows.length === 0)
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
       * Transform items for Plaid API (camelCase to snake_case)
       */
      const itemsForPlaid = items.map((item) => ({
        access_token: item.accessToken,
        item_id: item.itemId,
      }));

      /**
       * Get Plaid items
       */
      const plaidItems = await getItemsFromPlaid(itemsForPlaid);
      if (plaidItems.length === 0)
        return FailResponse("No items found from Plaid", 404);

      /**
       * Update items in DB
       */
      const updatedItems = await updateItemsWithPlaidItems(plaidItems);

      /**
       * Return quick success response
       */
      return SuccessResponse(
        {
          refreshedItemsCount: Array.isArray(updatedItems)
            ? updatedItems.length
            : 0,
          refreshedAt: new Date().toISOString(),
        },
        "Household items refreshed successfully"
      );
    } catch (error) {
      return ErrorResponse(getServerErrorMessage(error));
    }
  });
}
