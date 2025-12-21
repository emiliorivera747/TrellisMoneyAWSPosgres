import { Account } from "@/app/generated/prisma/client";

/**
 * Extracts an array of account IDs from a list of account objects.
 *
 * @param accounts - An array of account objects. Each object is expected to have an `account_id` property.
 * @returns An array of strings representing the account IDs.
 */
export function getAccountIds(accounts: Account[]): string[] {
  return accounts.map((account: any) => account.account_id);
}
