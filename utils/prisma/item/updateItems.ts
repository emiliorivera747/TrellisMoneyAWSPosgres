// import { Item as ItemPrisma } from "@/app/generated/prisma/client";
import { ItemWithConsentFields } from "plaid";


/**
 * Updates an item in the database.
 *
 * @param item - The item to update.
 * @returns The updated item.
 */
export const updateItem = async (item: ItemPrisma) => {
  try {
    const updatedItem = await prisma.item.update({
      where: { item_id: item.item_id },
      data: {
        item_id: item.item_id,
        institution_id: item.institution_id || "",
        webhook: item.webhook || "",
        available_products: item.available_products,
        billed_products: item.billed_products,
        products: item.products,
        consented_products: item.consented_products,
        consent_expiration_time: item.consent_expiration_time || "",
        update_type: item.update_type ?? undefined,
      },
    });
    return updatedItem;
  } catch (error) {
    throw new Error("Error updating item");
  }
};

export const updateItemsWithPlaidItems = async (
  items: ItemWithConsentFields[]
) => {
  const allItems = Promise.all(
    items.map(async (item) => {
      const res = await prisma.item.update({
        where: {
          item_id: item.item_id,
        },
        data: {
          available_products: item.available_products,
          billed_products: item.billed_products,
          products: item.products,
          error: item.error ? JSON.stringify(item.error) : undefined,
          institution_id: item.institution_id || "",
          institution_name: item.institution_name || "",
          update_type: item.update_type ?? undefined,
          webhook: item.webhook || "",
          consented_products: item.consented_products,
          consented_data_scopes: item.consented_data_scopes || [],
          consented_use_cases: item.consented_use_cases || [],
          consent_expiration_time: item.consent_expiration_time || "",
          auth_method: item.auth_method || "",
        },
      });
      return res;
    })
  );

  return allItems;
};
