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
          availableProducts: plaidItem.available_products || [],
          billedProducts: plaidItem.billed_products || [],
          products: plaidItem.products || [],
          error: plaidItem.error ? JSON.stringify(plaidItem.error) : null,
          institutionId: plaidItem.institution_id || "",
          institutionName: plaidItem.institution_name || "",
          updateType: plaidItem.update_type || "",
          webhook: plaidItem.webhook || "",
          consentedProducts: plaidItem.consented_products || [],
          consentedDataScopes: plaidItem.consented_data_scopes || [],
          consentedUseCases: plaidItem.consented_use_cases || [],
          consentExpirationTime: plaidItem.consent_expiration_time || "",
          authMethod: plaidItem.auth_method || "",
        })
        .where(eq(item.itemId, plaidItem.item_id))
        .returning();

      return res[0];
    })
  );

  return allItems;
};
