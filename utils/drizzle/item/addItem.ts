import { db } from "@/drizzle/db";
import { item } from "@/drizzle/schema";
import { AddItemProps } from "@/types/utils/drizzle/item/items";
import { getServerErrorMessage } from "@/utils/api-helpers/errors/getServerErrorMessage";

/**
 * Adds an item to the database.
 *
 * @param userId - Authenticated user ID
 * @param memberId - Household member ID
 * @param householdId - Household ID
 * @param plaidItem - Plaid item details
 * @returns The created item record
 */
export const addItem = async ({
  userId,
  memberId,
  householdId,
  plaidItem,
}: AddItemProps) => {
  try {
    const res = await db
      .insert(item)
      .values({
        itemId: plaidItem.item_id,
        userId,
        memberId,
        householdId,
        requestId: plaidItem.request_id,
        accessToken: plaidItem.access_token,
      })
      .returning();
    return res[0];
  } catch (error) {
    throw new Error(`Failed to add item: ${getServerErrorMessage(error)}`);
  }
};
