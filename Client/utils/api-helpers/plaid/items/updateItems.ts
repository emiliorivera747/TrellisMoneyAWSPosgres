import { ItemPrisma } from "@/types/prisma";
import { prisma } from "@/lib/prisma";


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
