import { db } from "@/drizzle/db";
import {
  account,
  AccountType,
  AccountVerificationStatus,
} from "@/drizzle/schema";
import { getServerErrorMessage } from "@/utils/api-helpers/errors/getServerErrorMessage";
import { AddAccountsParams } from "@/types/utils/drizzle/account/accounts";
import { valueOrDefault } from "@/utils/helper-functions/formatting/getValueOrDefaultValue";
import { PlaidAccount } from "react-plaid-link";

/**
 * Adds accounts to the database for the given item.
 *
 * @param item_id - The ID of the item
 * @param accounts - The accounts to be added
 * @returns The added accounts
 */
export const addPlaidMetadataAccounts = async ({
  itemId,
  plaidAccountsMetadata,
  householdMemberId,
}: AddAccountsParams) => {
  
  try {
    for (const plaidAccountMetadata of plaidAccountsMetadata) {
      
      const { type, subtype, verificationStatus } =
        getAccountEnums(plaidAccountMetadata);

      await db
        .insert(account)
        .values({
          itemId,
          householdMemberId,
          accountId: plaidAccountMetadata.id,
          accountName: plaidAccountMetadata.name,
          availableBalance: "0",
          currentBalance: "0",
          limitAmount: null,
          mask: valueOrDefault(plaidAccountMetadata.mask, null),
          type,
          subtype,
          verificationStatus,
        })
        .returning();
    }
  } catch (error) {
    throw new Error(`Failed to add accounts: ${getServerErrorMessage(error)}`);
  }
};

const getAccountEnums = (plaidAccount: PlaidAccount) => {
  const type = plaidAccount?.type
    ? (plaidAccount.type.toUpperCase() as AccountType)
    : ("OTHER" as AccountType);
  const subtype = plaidAccount?.subtype
    ? plaidAccount.subtype.toUpperCase()
    : null;
  const verificationStatus = plaidAccount?.verification_status
    ? (plaidAccount.verification_status.toUpperCase() as AccountVerificationStatus)
    : null;

  return { type, subtype, verificationStatus };
};
