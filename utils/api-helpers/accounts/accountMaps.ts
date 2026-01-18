import { Account } from "@/drizzle/schema";

/**
 * Generates a map from account IDs to their associated household member and item IDs.
 *
 * @param accounts - An array of `Account` objects containing account details.
 * @returns A `Map` where the key is the `accountId` and the value is an object
 *          containing `householdMemberId` and `itemId`.
 */
export const generateAccountMap = (accounts: Account[]) => {
  const map = new Map<
    string,
    { householdMemberId: string; itemId: string }
  >();
  for (let account of accounts) {
    map.set(account.accountId, {
      householdMemberId: account.householdMemberId || "",
      itemId: account.itemId || "",
    });
  }
  return map;
};
