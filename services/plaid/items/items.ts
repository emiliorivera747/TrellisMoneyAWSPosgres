import { client } from "@/config/plaidClient";
// import { Item } from "@/app/generated/prisma/client";

/**
 * Removes an item from Plaid using the provided access token.
 *
 * @param accessToken - The access token associated with the item to be removed.
 * @returns A promise that resolves to the response from the Plaid API after the item is removed.
 */
export const removeItemFromPlaid = async (accessToken: string) => {
  if (!accessToken) throw new Error("Missing access token");

  try {
    await client.itemRemove({
      access_token: accessToken,
    });
    return true;
  } catch (error) {
    // Enhance error with context
    const plaidError = (error as any)?.response?.data || error;

    // If the item is already gone from Plaid, don't block the DB deletion
    if (
      plaidError.error_code === "ITEM_NOT_FOUND" ||
      plaidError.error_code === "INVALID_ACCESS_TOKEN"
    ) {
      console.warn(
        "Item already removed from Plaid or token invalid. Proceeding with DB cleanup."
      );
      return true;
    }

    console.error("Plaid itemRemove failed:", plaidError);
    throw new Error(plaidError.error_message || "Plaid communication failed");
  }
};

/**
 * Retrieves item details from Plaid for a list of items.
 *
 * @param items - An array of items, each containing an access token.
 * @returns A promise that resolves to an array of item details retrieved from Plaid.
 */
export const getItemsFromPlaid = async (items: any[]) => {
  const allItems = await Promise.all(
    items.map(async (item) => {
      const res = await client.itemGet({ access_token: item.access_token });
      return res.data.item; // Return only the Plaid item details
    })
  );
  return allItems;
};
