import { NextRequest } from "next/server";
import { withAuth } from "@/lib/protected";
import {
  SuccessResponse,
  ErrorResponse,
  FailResponse,
} from "@/utils/api-helpers/api-responses/response";
import { getServerErrorMessage } from "@/utils/api-helpers/errors/getServerErrorMessage";
import { getMembers } from "@/utils/drizzle/household-member/members";
import { getItemsWithMembersByHouseholdMemberIds } from "@/utils/drizzle/item/getItem";
import { addItem } from "@/utils/drizzle/item/addItem";

/**
 * Handles POST requests to create a new Plaid item.
 *
 * Expects a JSON body with `plaidItem` containing `item_id` and `access_token`.
 * Creates a new item in the database and returns the created item (excluding `access_token`).
 *
 * Example:
 * ```json
 * POST /api/plaid/items
 * {
 *   "plaidItem": {
 *     "item_id": "123",
 *     "access_token": "access-token-abc"
 *   }
 * }
 * ```
 */
export async function POST(req: NextRequest) {
  return withAuth(req, async (request, user) => {
    try {
      const body = await request.json();
      const { plaidItem } = body;

      if (!plaidItem || !plaidItem.item_id || !plaidItem.access_token) {
        return FailResponse("Missing required fields: plaidItem with item_id and access_token", 400);
      }

      // Create the item using Drizzle
      const createdItem = await addItem({
        userId: user.id,
        plaidItem,
      });

      if (!createdItem) {
        return FailResponse("Failed to create item", 500);
      }

      // Remove access_token from response for security
      const { accessToken, ...itemWithoutToken } = createdItem;

      return SuccessResponse(
        { item: itemWithoutToken },
        "Item created successfully"
      );
    } catch (error) {
      return ErrorResponse(getServerErrorMessage(error));
    }
  });
}

/**
 * Retrieves Plaid items linked to the authenticated user's household.
 *
 * - Ensures user authentication via `withAuth`.
 * - Fetches Plaid items associated with household members.
 * - Excludes access tokens for security.
 * - Returns 404 if no items are found or an error response on failure.
 */
export async function GET(req: NextRequest) {
  return withAuth(req, async (request, user) => {
    try {
      // Get household members for the user
      const memberRows = await getMembers(user.id);
      if (memberRows.length === 0) return FailResponse("No household membership found", 404);
    
      // Get household member IDs
      const householdMemberIds = memberRows.map((m) => m.householdMemberId);

      // Get items with their associated members
      const itemsWithMembers = await getItemsWithMembersByHouseholdMemberIds(householdMemberIds);
      if (itemsWithMembers.length === 0) {
        return FailResponse("No items found", 404);
      }

      // Format response to only include item and member(s)
      const itemsWithMember = itemsWithMembers.map((itemData) => {
        const { accessToken, members, ...itemWithoutToken } = itemData;
        return {
          item: itemWithoutToken,
          member: members.length > 0 ? members[0] : null, // Return first member or null
        };
      });

      return SuccessResponse({ items: itemsWithMember }, "Items retrieved successfully");
    } catch (error) {
      return ErrorResponse(getServerErrorMessage(error));
    }
  });
}
