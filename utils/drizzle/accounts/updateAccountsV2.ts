// Helpers
import { ErrorResponse } from "@/utils/api-helpers/api-responses/response";

// Drizzle
import { db } from "@/drizzle/db";
import { account, Account, AccountType } from "@/drizzle/schema";

// Utils
import { valueOrDefault } from "@/utils/helper-functions/formatting/getValueOrDefaultValue";
import { generateAccountMap } from "@/utils/api-helpers/accounts/accountMaps";

// Types
import {
  AccountSubtype,
  AccountType as PlaidAccountType,
  AccountBase,
  AccountBalance,
} from "plaid";

/**
 * Default balance object
 */
const DEFAULT_BALANCE = {
  available: 0,
  current: 0,
  limit: 0,
  iso_currency_code: "",
  unofficial_currency_code: "",
};

/**
 * Convert Plaid account type to Drizzle AccountType enum
 */
const convertAccountType = (plaidType: PlaidAccountType | null | undefined): AccountType => {
  if (!plaidType) return "DEPOSITORY";
  
  const upperType = plaidType.toUpperCase() as AccountType;
  // Validate it's a valid enum value, default to DEPOSITORY if not
  const validTypes: AccountType[] = ["DEPOSITORY", "CREDIT", "LOAN", "INVESTMENT", "OTHER"];
  return validTypes.includes(upperType) ? upperType : "DEPOSITORY";
};

/**
 * Update the accounts in the database
 * Optimized to use batch operations via transaction to reduce database round-trips
 */
export async function updateAccounts(
  accountBase: AccountBase[][],
  householdAccounts: Account[]
) {
  const plaidAccounts = accountBase.flat();
  const accountMap = generateAccountMap(householdAccounts);

  try {
    const res = await db.transaction(async (tx) => {
      const accountResults = [];

      for (const plaidAccount of plaidAccounts) {
        const balances = plaidAccount?.balances ?? DEFAULT_BALANCE;
        const accountData = extractAccountFromPlaid(plaidAccount, balances);
        
        // Id's
        const accountId = plaidAccount.account_id;
        const householdMemberId = accountMap.get(accountId)?.householdMemberId || "";
        const itemId = accountMap.get(accountId)?.itemId || "";

        if (!householdMemberId || !itemId) {
          console.warn(`Missing householdMemberId or itemId for account ${accountId}`);
          continue;
        }

        // Upsert account
        const accountResult = await tx
          .insert(account)
          .values({
            accountId,
            householdMemberId,
            itemId,
            ...accountData,
          })
          .onConflictDoUpdate({
            target: account.accountId,
            set: {
              ...accountData,
            },
          })
          .returning();

        accountResults.push(accountResult[0]);
      }
      return { accounts: accountResults };
    });

    return res.accounts;
  } catch (error) {
    return ErrorResponse("Failed to update accounts and balances");
  }
}

const extractAccountFromPlaid = (account: AccountBase, balances: AccountBalance) => {
  const accountData = {
    accountName: valueOrDefault(account?.name, ""),
    officialName: account.official_name ?? null,
    mask: account.mask ?? null,
    type: convertAccountType(account?.type),
    subtype: account?.subtype ?? null,
    availableBalance: valueOrDefault(balances?.available, 0).toString(),
    currentBalance: valueOrDefault(balances?.current, 0).toString(),
    limitAmount: valueOrDefault(balances?.limit, 0).toString(),
    holderCategory: account.holder_category ?? null,
  };
  return accountData;
};
