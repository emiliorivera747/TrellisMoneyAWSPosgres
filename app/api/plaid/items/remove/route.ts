import { NextRequest } from "next/server";

// Libe
import { withAuth } from "@/lib/protected";
import prisma from "@/lib/prisma";

// Services
import { removeItemFromPlaid } from "@/services/plaid/items/items";

// Utils
import getItemWithHousehold from "@/utils/prisma/item/getItemWithHousehold";
import { getMemberInfo } from "@/utils/api-helpers/item/getMemberInfo";

import {
  apiFail,
  apiSuccess,
  apiError,
} from "@/utils/api-helpers/api-responses/response";

/**
 * Handles the POST request to remove a Plaid item.
 *
 * This function is wrapped with authentication middleware to ensure that the user
 * is authenticated and authorized to perform the operation. It performs the following steps:
 * 1. Parses the request body to extract the `item_id`.
 * 2. Retrieves the item associated with the provided `item_id` and the authenticated user.
 * 3. Checks if the item exists and if the user has the necessary permissions to remove it.
 * 4. If authorized, removes the item from Plaid and deletes it from the database.
 * 5. Returns appropriate responses based on the success or failure of the operation.
 *
 * @param req - The incoming HTTP request object of type `NextRequest`.
 * @returns A `NextResponse` object containing the result of the operation:
 * - 200: If the item is successfully removed.
 * - 403: If the user does not have permission to remove the item.
 * - 404: If the item is not found or the user does not have access to it.
 * - 500: If an error occurs during the operation.
 *
 * @throws Will return a 500 status code if an unexpected error occurs.
 */
export async function POST(req: NextRequest) {
  return withAuth(req, async (request, user) => {
    try {
      const { item_id } = await req.json();
      const user_id = user.id;

      if (!item_id || typeof item_id !== "string")
        return apiFail("Invalid item_id", 400);

      /**
       * Get the item with all of its populated objects
       */
      const item = await getItemWithHousehold({ item_id, user_id });

      /**
       *  If item not found return 404 error
       */
      if (!item)
        return apiFail("Item not found or you do not have access to it.", 404);

      const { isOwner, isAdmin } = getMemberInfo(item, user_id);

      /**
       * Is the current user the owner of the item? or
       * Are they a currentMember and have ADMIN privileges?
       */
      if (isOwner || isAdmin) {
        try {
          await removeItemFromPlaid(item.access_token);
          await prisma.item.delete({ where: { item_id } });
          return apiSuccess(null, "Item successfully removed.", 200);
        } catch (error) {
          return apiFail(
            "We couldn't disconnect the institution right now. Please try again in a few minutes. Your data is safe.",
            502
          );
        }
      } else {
        return apiFail("You do not have permission to remove this item.", 403);
      }
    } catch (error) {
      console.error("Unexpected error in remove item endpoint:", error);
      return apiError(error, 500);
    }
  });
}
