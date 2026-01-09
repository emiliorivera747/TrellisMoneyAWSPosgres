// import { Account } from "@/app/generated/prisma/client";

/**
 * Extracts an array of account IDs from a list of account objects.
 *
 * @param accounts - An array of account objects. Each object is expected to have an `account_id` property.
 * @returns An array of strings representing the account IDs.
 */
export function getAccountIds(accounts: Account[]): string[] {
  return accounts.map((account: any) => account.account_id);
}

/**
 * Compares two arrays of account IDs and determines if they are equal.
 *
 * This function checks if every account ID in the first array is present
 * in the second array. It does not verify if the second array contains
 * additional IDs not present in the first array.
 *
 * @param accountIds1 - The first array of account IDs to compare.
 * @param accountIds2 - The second array of account IDs to compare.
 * @returns `true` if all IDs in `accountIds1` are included in `accountIds2`, otherwise `false`.
 */
export const areAccountsEqual = (
  accountIds1: string[],
  accountIds2: string[]
) => {
  return accountIds1.every((id: string) => accountIds2.includes(id));
};

/**
 * Compares two arrays of accounts to determine if they match.
 *
 * This function extracts the account IDs from both arrays and checks if the
 * IDs are equal using the `areAccountsEqual` function.
 *
 * @param accounts1 - The first array of accounts to compare.
 * @param accounts2 - The second array of accounts to compare.
 * @returns `true` if the accounts match, otherwise `false`.
 */
export const doAccountsMatch = (accounts1: Account[], accounts2: Account[]) => {
  const ids1 = getAccountIds(accounts1);
  const ids2 = getAccountIds(accounts2);
  return areAccountsEqual(ids1, ids2);
};
