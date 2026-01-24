import { ItemWithConsentFields } from "plaid";
import { db } from "@/drizzle/db";
import { item } from "@/drizzle/schema";
import { eq } from "drizzle-orm";

/**
 * Updates items in the database with Plaid item data.
 *
 * @param items - Array of Plaid items with consent fields to update.
 * @returns Promise resolving to array of updated items.
 */
export const updateItemsWithPlaidItems = async (
  items: ItemWithConsentFields[]
) => {
  const allItems = await Promise.all(
    items.map(async (plaidItem) => {
      const res = await db
        .update(item)
        .set({
          institutionId: plaidItem.institution_id || "",
          institutionName: plaidItem.institution_name || "",
          webhook: plaidItem.webhook || "",
          errorType: plaidItem.error?.error_type || null,
          errorCode: plaidItem.error?.error_code || null,
        })
        .where(eq(item.itemId, plaidItem.item_id))
        .returning();

      return res[0];
    })
  );

  return allItems;
};
