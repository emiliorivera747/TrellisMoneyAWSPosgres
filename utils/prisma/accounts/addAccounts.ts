import { db } from "@/drizzle/db";
import { account, balance } from "@/drizzle/schema";
import { PlaidLinkOnSuccessMetadata } from "react-plaid-link";

interface AddAccountsParams {
  itemId: string;
  plaidAccounts: PlaidLinkOnSuccessMetadata["accounts"];
  householdId: string;
  memberId: string;
}

/**
 * Adds accounts to the database for the given item.
 *
 * @param item_id - The ID of the item
 * @param accounts - The accounts to be added
 * @returns The added accounts
 */
export const addPlaidMetadataAccounts = async ({
  itemId,
  plaidAccounts,
  householdId,
  memberId,
}: AddAccountsParams) => {
  const accountAdded = [];

  for (const plaidAccount of plaidAccounts) {
    const createdAccount = await db.insert(account).values({
      itemId,
      householdId,
      memberId,
      accountId: plaidAccount.id,
      name: plaidAccount.name,
      mask: plaidAccount.mask || null,
      type: plaidAccount.type,
      subtype: plaidAccount.subtype,
      verificationStatus: plaidAccount.verification_status || null,
    });

    accountAdded.push(createdAccount);
  }

  return accountAdded;
};
