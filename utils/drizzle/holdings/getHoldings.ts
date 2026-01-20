import { db } from "@/drizzle/db";
import { holding, account, Item } from "@/drizzle/schema";
import { inArray, eq } from "drizzle-orm";

/**
 * Retrieves all holdings associated with the provided items.
 * Holdings are linked to items through accounts.
 *
 * @param items - Array of items to get holdings for
 * @returns A promise that resolves to an array of all holdings for the given items
 */
export const getHoldingsFromItems = async (items: Pick<Item, "itemId">[]) => {
  // Extract item IDs from the items array
  const itemIds = items.map((item) => item.itemId);

  // If no items provided, return empty array
  if (itemIds.length === 0) return [];

  // Query holdings by joining with accounts to filter by itemId
  const holdingsData = await db
    .select({
      holding: holding,
    })
    .from(holding)
    .innerJoin(account, eq(account.accountId, holding.accountId))
    .where(inArray(account.itemId, itemIds));

  return holdingsData.map((row) => row.holding);
};
