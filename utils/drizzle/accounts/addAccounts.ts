import { db } from "@/drizzle/db";
import { account} from "@/drizzle/schema";
import { PlaidLinkOnSuccessMetadata } from "react-plaid-link";

interface AddAccountsParams {
  user_id: string;
  item_id: string;
  accounts: PlaidLinkOnSuccessMetadata["accounts"];
  household_id: string;
  member_id: string;
}

/**
 * Adds accounts to the database for the given item.
 * Creates both balance and account records for each account.
 *
 * @param user_id - The ID of the user
 * @param item_id - The ID of the item
 * @param accounts - The accounts to be added from Plaid metadata
 * @param household_id - The ID of the household
 * @param member_id - The ID of the household member
 * @returns The added accounts
 */
export const addAccounts = async ({
  user_id,
  item_id,
  accounts,
  household_id,
  member_id,
}: AddAccountsParams) => {
  const accountAdded = [];

  for (const plaidAccount of accounts) {
    // Create balance first (accounts require a balanceId)
    const balanceData = {
      balanceId: plaidAccount.id,
      available: (plaidAccount.balances?.available ?? 0).toString(),
      current: (plaidAccount.balances?.current ?? 0).toString(),
      limit: (plaidAccount.balances?.limit ?? 0).toString(),
      isoCurrencyCode: plaidAccount.balances?.iso_currency_code ?? "",
      unofficialCurrencyCode:
        plaidAccount.balances?.unofficial_currency_code ?? "",
    };

    await db.insert(balance).values(balanceData).onConflictDoNothing();

    // Create account
    const accountData = {
      accountId: plaidAccount.id,
      balanceId: plaidAccount.id,
      userId: user_id,
      memberId: member_id,
      householdId: household_id,
      itemId: item_id,
      name: plaidAccount.name ?? null,
      mask: plaidAccount.mask ?? null,
      type: plaidAccount.type ?? null,
      subtype: plaidAccount.subtype ?? null,
      verificationStatus: plaidAccount.verification_status ?? null,
      available: (plaidAccount.balances?.available ?? 0).toString(),
      current: (plaidAccount.balances?.current ?? 0).toString(),
      limit: (plaidAccount.balances?.limit ?? 0).toString(),
      isoCurrencyCode: plaidAccount.balances?.iso_currency_code ?? null,
      unofficialCurrencyCode:
        plaidAccount.balances?.unofficial_currency_code ?? null,
    };

    const createdAccount = await db
      .insert(account)
      .values(accountData)
      .returning();

    accountAdded.push(createdAccount[0]);
  }

  return accountAdded;
};
