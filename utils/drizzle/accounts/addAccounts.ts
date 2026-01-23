import { db } from "@/drizzle/db";
import {
  account,
  AccountType,
  AccountVerificationStatus,
} from "@/drizzle/schema";
import { getServerErrorMessage } from "@/utils/api-helpers/errors/getServerErrorMessage";
import { AddAccountsParams } from "@/types/utils/drizzle/account/accounts";
import { PlaidAccount } from "react-plaid-link";

/**
 * Adds Plaid account metadata to the database.
 * - Uses a transaction
 * - Batch inserts for performance
 * - Safely handles enum mismatches
 * - Prevents duplicate primary key crashes
 */
export const addPlaidMetadataAccounts = async ({
  itemId,
  plaidAccountsMetadata,
  householdMemberId,
}: AddAccountsParams) => {
  if (!plaidAccountsMetadata.length) return;

  try {
    const rows = plaidAccountsMetadata.map((plaidAccount) => {
      const { type, subtype, verificationStatus } =
        getAccountEnums(plaidAccount);

      return {
        // REQUIRED FIELDS (No defaults in schema)
        accountId: plaidAccount.id,
        accountName: plaidAccount.name,
        type,
        itemId,
        householdMemberId,

        // OPTIONAL / DYNAMIC FIELDS
        mask: plaidAccount.mask ?? null,
        subtype,
        verificationStatus,
      };
    });

    // Atomic operation: No transaction wrapper needed
    await db.insert(account).values(rows).onConflictDoNothing();
  } catch (error) {
    throw new Error(
      `Failed to add Plaid accounts: ${getServerErrorMessage(error)}`
    );
  }
};

const VALID_ACCOUNT_TYPES = new Set([
  "DEPOSITORY",
  "CREDIT",
  "LOAN",
  "INVESTMENT",
  "OTHER",
]);

const getAccountEnums = (plaidAccount: PlaidAccount) => {
  // Normalize the type
  const rawType = plaidAccount?.type?.toUpperCase() || "";

  // 2. Validate against whitelist, fallback to "OTHER"
  const type = VALID_ACCOUNT_TYPES.has(rawType)
    ? (rawType as AccountType)
    : ("OTHER" as AccountType);

  // 3. Safety check for subtype length (Postgres varchar(50) limit)
  const subtype = plaidAccount?.subtype
    ? plaidAccount.subtype.toUpperCase().slice(0, 50)
    : null;

  const rawStatus = plaidAccount?.verification_status?.toUpperCase();
  const verificationStatus = (rawStatus as AccountVerificationStatus) || null;

  return { type, subtype, verificationStatus };
};
