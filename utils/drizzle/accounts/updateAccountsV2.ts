// Helpers
import { ErrorResponse } from "@/utils/api-helpers/api-responses/response";

// Drizzle
import { db } from "@/drizzle/db";
import { account, balance, Account } from "@/drizzle/schema";

// Utils
import { valueOrDefault } from "@/utils/helper-functions/formatting/getValueOrDefaultValue";
import { generateAccountMap } from "@/utils/api-helpers/accounts/accountMaps";

// Types
import {
  AccountSubtype,
  AccountType,
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
      const balanceResults: any[] = []; // Replace 'any' with the correct type if known
      const accountResults = [];

      for (const plaidAccount of plaidAccounts) {
        const balances = plaidAccount?.balances ?? DEFAULT_BALANCE;
        const accountData = extractAccountFromPlaid(plaidAccount);
        const plaidBalancesData = extractBalanceFromPlaid(balances);
        
        // Id's
        const accountId = plaidAccount.account_id;
        const userId = accountMap.get(accountId)?.userId || "";
        const householdId = accountMap.get(accountId)?.householdId || "";
        const itemId = accountMap.get(accountId)?.itemId || "";

        const balanceResult = await tx
          .insert(balance)
          .values({
            balanceId: accountId,
            ...plaidBalancesData,
          })
          .onConflictDoUpdate({
            target: balance.balanceId,
            set: {
              ...plaidBalancesData,
            },
          })
          .returning();

        balanceResults.push(balanceResult[0]);

        // Upsert account
        const accountResult = await tx
          .insert(account)
          .values({
            balanceId: accountId,
            userId,
            householdId,
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
      return { balances: balanceResults, accounts: accountResults };
    });

    return res.accounts;
  } catch (error) {
    return ErrorResponse("Failed to update accounts and balances");
  }
}

const extractBalanceFromPlaid = (balance: AccountBalance) => {
  const balanceData = {
    available: valueOrDefault(balance?.available, 0).toString(),
    current: valueOrDefault(balance?.current, 0).toString(),
    limit: valueOrDefault(balance?.limit, 0).toString(),
    isoCurrencyCode: valueOrDefault(balance?.iso_currency_code, ""),
    unofficialCurrencyCode: valueOrDefault(
      balance?.unofficial_currency_code,
      ""
    ),
  };
  return balanceData;
};

const extractAccountFromPlaid = (account: AccountBase) => {
  const accountData = {
    accountId: account.account_id,
    mask: account.mask,
    official_name: account.official_name,
    name: valueOrDefault(account?.name, ""),
    type: valueOrDefault(account?.type, "depository" as AccountType),
    subtype: valueOrDefault(account?.subtype, "checking" as AccountSubtype),
    available: valueOrDefault(account.balances.available, 0).toString(),
    current: valueOrDefault(account.balances.current, 0).toString(),
    limit: valueOrDefault(account.balances.limit, 0).toString(),
    iso_currency_code: valueOrDefault(account.balances.iso_currency_code, ""),
    unofficial_currency_code: valueOrDefault(
      account.balances.unofficial_currency_code,
      ""
    ),
    holderCategory: account.holder_category,
  };
  return accountData;
};
