import { db } from "@/drizzle/db";
import { account, Item } from "@/drizzle/schema";
import { inArray } from "drizzle-orm";

/**
 * Retrieves all accounts associated with the provided items.
 *
 * @param items - Array of items to get accounts for
 * @returns A promise that resolves to an array of all accounts for the given items
 */
export const getAccountsFromItems = async (items: Pick<Item, "itemId">[]) => {
  // Extract item IDs from the items array
  const itemIds = items.map((item) => item.itemId);

  // If no items provided, return empty array
  if (itemIds.length === 0) {
    return [];
  }

  // Query all accounts for the given item IDs in a single query
  const accounts = await db
    .select()
    .from(account)
    .where(inArray(account.itemId, itemIds));

  return accounts;
};