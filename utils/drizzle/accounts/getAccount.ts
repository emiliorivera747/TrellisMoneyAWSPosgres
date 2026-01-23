import { db } from "@/drizzle/db";
import { account, Item } from "@/drizzle/schema";
import { inArray, desc } from "drizzle-orm";

/**
 * Retrieves all accounts associated with the provided items.
 *
 * @param items - Array of items to get accounts for
 * @returns A promise that resolves to an array of all accounts for the given items
 */
export const getAccountsFromItems = async (items: Pick<Item, "itemId">[]) => {
  const itemIds = items.map((item) => item.itemId);

  if (itemIds.length === 0) return [];

  const accounts = await db
    .select()
    .from(account)
    .where(inArray(account.itemId, itemIds))
    .orderBy(desc(account.currentBalance));

  return accounts;
};
