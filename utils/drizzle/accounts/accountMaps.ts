import { Account } from "@/drizzle/schema";

/**
 * Generates a map from account IDs to their associated user and household IDs.
 *
 * @param accounts - An array of `Account` objects containing account details.
 * @returns A `Map` where the key is the `accountId` and the value is an object 
 *          containing `userId` and `householdId`.
 */
export const generateAccountMap = (accounts: Account[]) => {
  const map = new Map<string, { userId: string; householdId: string }>();
  for (let account of accounts) {
    map.set(account.accountId, {
      userId: account.userId || "",
      householdId: account.householdId || "",
    });
  }
};
