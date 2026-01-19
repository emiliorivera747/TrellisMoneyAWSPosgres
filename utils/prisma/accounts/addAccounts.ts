import { db } from "@/drizzle/db";
import {
  account,
  AccountInsert,
  AccountType,
  AccountVerificationStatus,
} from "@/drizzle/schema";
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
  householdMemberId,
}: AddAccountsParams) => {
  try {
    const accountAdded = [];

    // Validate all accounts before inserting any
    for (const plaidAccount of plaidAccounts) {
      if (!plaidAccount.id) throw new Error("Account ID is required");

      if (!plaidAccount.name)
        throw new Error(
          `Account name is required for account ${plaidAccount.id}`
        );

      if (!plaidAccount.type)
        throw new Error(
          `Account type is required for account ${plaidAccount.id}`
        );
    }

    for (const plaidAccount of plaidAccounts) {
      const createdAccount = await db
        .insert(account)
        .values({
          itemId,
          householdMemberId,
          accountId: plaidAccount.id,
          accountName: plaidAccount.name,
          availableBalance: "0",
          currentBalance: "0",
          limitAmount: null,
          mask: plaidAccount.mask || null,
          type: plaidAccount.type.toUpperCase() as AccountType,
          subtype: plaidAccount.subtype.toUpperCase() || null,
          verificationStatus:
            (plaidAccount.verification_status.toUpperCase() as AccountVerificationStatus | null) ||
            null,
        } satisfies AccountInsert)
        .returning();
      accountAdded.push(createdAccount[0]);
    }
    return accountAdded;
  } catch (error) {
    throw new Error(`Failed to add accounts: ${getServerErrorMessage(error)}`);
  }
};
