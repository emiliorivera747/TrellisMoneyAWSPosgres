import { NextRequest } from "next/server";
import { withAuth } from "@/lib/protected";
import {
  SuccessResponse,
  ErrorResponse,
  FailResponse,
} from "@/utils/api-helpers/api-responses/response";
import { getServerErrorMessage } from "@/utils/api-helpers/errors/getServerErrorMessage";
import { getMembers } from "@/utils/drizzle/household-member/members";
import { getItemsByHouseholdMemberIds } from "@/utils/drizzle/item/getItem";
import { addItem } from "@/utils/drizzle/item/addItem";

/**
 * Handles the POST request to create a new item in the database.
 *
 * This function expects a JSON payload in the request body containing a `plaidItem` object
 * with Plaid item details (from ItemPublicTokenExchangeResponse).
 * It uses Drizzle to create a new record in the `item` table.
 *
 * @param req - The incoming HTTP request object of type `NextRequest`.
 * @returns A JSON response containing a success message and the created item object
 *          (without access_token), or an error message with a 500 status code in case of failure.
 *
 * Example usage:
 * ```json
 * POST /api/plaid/items
 * {
 *   "plaidItem": {
 *     "item_id": "123",
 *     "access_token": "access-token-abc",
 *     ...
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
 * Handles the GET request to retrieve Plaid items associated with the authenticated user's household.
 *
 * @param req - The incoming Next.js request object.
 * @returns A promise that resolves to a response containing the user's household Plaid items
 *          (without access_token) or an appropriate error response.
 *
 * @remarks
 * - This function uses the `withAuth` middleware to ensure the user is authenticated.
 * - It queries the database for Plaid items associated with the user's household members.
 * - Items are retrieved through household members (via accounts) to get all items in the household.
 * - Access tokens are excluded from the response for security.
 * - If no items are found, it returns a 404 response with a failure message.
 * - In case of an error during the database query, it returns an error response with
 *   the appropriate server error message.
 *
 * @throws Will throw an error if the database query fails.
 */
export async function GET(req: NextRequest) {
  return withAuth(req, async (request, user) => {
    try {
      // Get household members for the user
      const memberRows = await getMembers(user.id);
      if (memberRows.length === 0) {
        return FailResponse("No household membership found", 404);
      }

      // Get household member IDs
      const householdMemberIds = memberRows.map((m) => m.householdMemberId);

      // Get items associated with these household members
      const items = await getItemsByHouseholdMemberIds(householdMemberIds);
      if (items.length === 0) {
        return FailResponse("No items found", 404);
      }

      // Remove access_token from response for security
      const itemsWithoutToken = items.map((item) => {
        const { accessToken, ...rest } = item;
        return rest;
      });

      return SuccessResponse({ items: itemsWithoutToken }, "Items retrieved successfully");
    } catch (error) {
      return ErrorResponse(getServerErrorMessage(error));
    }
  });
}
