import { db } from "@/drizzle/db";
import { holding, account, Item, Account } from "@/drizzle/schema";
import { inArray, eq } from "drizzle-orm";

/**
 * Get holdings for specific accounts
 * PREFERRED: Use this when you already have accounts from items
 */
export const getHoldingsByAccounts = async (accounts: Account[]) => {
  if (accounts.length === 0) return [];
  const accountIds = accounts.map((acc) => acc.accountId);

  const holdings = await db
    .select()
    .from(holding)
    .where(inArray(holding.accountId, accountIds));

  return holdings;
};
