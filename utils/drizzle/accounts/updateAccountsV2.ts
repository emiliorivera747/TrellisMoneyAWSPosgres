import { AccountBalance } from "plaid";
import { getValueOrDefault } from "@/utils/helper-functions/formatting/getValueOrDefaultValue";
import { AccountSubtype, AccountType } from "plaid";
import { db } from "@/drizzle/db";
import { account, balance } from "@/drizzle/schema";
import { eq } from "drizzle-orm";
import { sql } from "drizzle-orm";

//Types
import { AccountBaseWithItemId, Account } from "@/types/services/plaid/plaid";

// Helpers
import { ErrorResponse } from "@/utils/api-helpers/api-responses/response";

/**
 * Update the accounts in the database
 * Optimized to use batch operations via transaction to reduce database round-trips
 */
export async function updateAccounts(
  accountBase: AccountBaseWithItemId[][],
  householdAccounts: Account[]
) {
  const accounts = accountBase.flat();
  const map = new Map<
    string,
    { user_id: string; household_id: string; item_id: string }
  >();
  const n = householdAccounts?.length;

  for (let i = 0; i < n; i++) {
    let acc = householdAccounts[i];
    map.set(acc.account_id, {
      user_id: acc.user_id || "",
      household_id: acc.household_id || "",
      item_id: acc.item_id || "",
    });
  }

  try {
    const res = await db.transaction(async (tx) => {
      const balanceResults = [];
      const accountResults = [];

      for (const plaidAccount of accounts) {
        const balances = plaidAccount?.balances ?? default_balance;
        const accountData = extractAccountData(plaidAccount, balances);
        const account_id = plaidAccount.account_id;
        const user_id = map.get(account_id)?.user_id || "";
        const household_id = map.get(account_id)?.household_id || "";
        const item_id = map.get(account_id)?.item_id || "";

        // Upsert balance
        const balanceResult = await tx
          .insert(balance)
          .values({
            balanceId: account_id,
            available: getValueOrDefault(balances?.available, 0).toString(),
            current: getValueOrDefault(balances?.current, 0).toString(),
            limit: getValueOrDefault(balances?.limit, 0).toString(),
            isoCurrencyCode: getValueOrDefault(
              balances?.iso_currency_code,
              ""
            ),
            unofficialCurrencyCode: getValueOrDefault(
              balances?.unofficial_currency_code,
              ""
            ),
            updatedAt: new Date().toISOString(),
          })
          .onConflictDoUpdate({
            target: balance.balanceId,
            set: {
              available: getValueOrDefault(balances?.available, 0).toString(),
              current: getValueOrDefault(balances?.current, 0).toString(),
              limit: getValueOrDefault(balances?.limit, 0).toString(),
              isoCurrencyCode: getValueOrDefault(
                balances?.iso_currency_code,
                ""
              ),
              unofficialCurrencyCode: getValueOrDefault(
                balances?.unofficial_currency_code,
                ""
              ),
              updatedAt: new Date().toISOString(),
            },
          })
          .returning();

        balanceResults.push(balanceResult[0]);

        // Upsert account
        const accountResult = await tx
          .insert(account)
          .values({
            accountId: account_id,
            name: accountData.name,
            type: accountData.type,
            subtype: accountData.subtype,
            available: accountData.available.toString(),
            current: accountData.current.toString(),
            limit: accountData.limit.toString(),
            isoCurrencyCode: accountData.iso_currency_code,
            unofficialCurrencyCode: accountData.unofficial_currency_code,
            balanceId: account_id,
            userId: user_id,
            householdId: household_id || null,
            itemId: item_id,
            updatedAt: new Date().toISOString(),
          })
          .onConflictDoUpdate({
            target: account.accountId,
            set: {
              name: accountData.name,
              type: accountData.type,
              subtype: accountData.subtype,
              available: accountData.available.toString(),
              current: accountData.current.toString(),
              limit: accountData.limit.toString(),
              isoCurrencyCode: accountData.iso_currency_code,
              unofficialCurrencyCode: accountData.unofficial_currency_code,
              updatedAt: new Date().toISOString(),
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

/**
 * Default balance object
 */
const default_balance = {
  available: 0,
  current: 0,
  limit: 0,
  iso_currency_code: "",
  unofficial_currency_code: "",
};

/**
 *
 * Extract the account data from the Plaid account object
 *
 * @param account
 * @param balances
 * @returns
 */
const extractAccountData = (
  account: AccountBaseWithItemId,
  balances: AccountBalance
) => {
  const accountData = {
    name: getValueOrDefault(account?.name, ""),
    type: getValueOrDefault(account?.type, "depository" as AccountType),
    subtype: getValueOrDefault(account?.subtype, "checking" as AccountSubtype),
    available: getValueOrDefault(balances.available, 0),
    current: getValueOrDefault(balances.current, 0),
    limit: getValueOrDefault(balances.limit, 0),
    iso_currency_code: getValueOrDefault(balances.iso_currency_code, ""),
    unofficial_currency_code: getValueOrDefault(
      balances.unofficial_currency_code,
      ""
    ),
  };
  return accountData;
};
