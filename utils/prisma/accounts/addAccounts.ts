import { db } from "@/drizzle/db";
import { account } from "@/drizzle/schema";
import { getServerErrorMessage } from "@/utils/api-helpers/errors/getServerErrorMessage";
import { AddAccountsParams } from "@/types/utils/drizzle/account/accounts";

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
  try {
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
  } catch (error) {
    throw new Error(`Failed to add accounts: ${getServerErrorMessage(error)}`);
  }
};
