import { db } from "@/drizzle/db";
import { account, Item, householdMember } from "@/drizzle/schema";
import { inArray, desc, eq } from "drizzle-orm";

/**
 * Retrieves all accounts associated with the provided items, including member data.
 *
 * @param items - Array of items to get accounts for
 * @returns A promise that resolves to an array of all accounts for the given items with their associated members
 */
export const getAccountsFromItems = async (items: Pick<Item, "itemId">[]) => {
  const itemIds = items.map((item) => item.itemId);

  if (itemIds.length === 0) return [];

  const accounts = await db
    .select({
      account: account,
      member: householdMember,
    })
    .from(account)
    .leftJoin(
      householdMember,
      eq(account.householdMemberId, householdMember.householdMemberId)
    )
    .where(inArray(account.itemId, itemIds))
    .orderBy(desc(account.currentBalance));

  return accounts;
};
