import prisma from "@/lib/prisma";
import { AccountBalance } from "plaid";
import { getValueOrDefault } from "@/utils/helper-functions/formatting/getValueOrDefaultValue";
import { AccountSubtype, AccountType } from "plaid";

//Types
import { AccountBaseWithItemId } from "@/types/plaid";

// Helpers
import { ErrorResponse } from "@/utils/api-helpers/api-responses/response";

import { Account } from "@/app/generated/prisma/client";

/**
 * Update the accounts in the database
 * Optimized to use batch operations via $transaction to reduce database round-trips
 */
export async function updateAccounts(
  accountBase: AccountBaseWithItemId[][],
  householdAccounts: Account[]
) {
  const accounts = accountBase.flat();
  const map = new Map();
  const n = householdAccounts.length;

  for (let i = 0; i < n; i++) {
    let account = householdAccounts[i];
    map.set(account.account_id, {
      user_id: account.user_id,
      member_id: account.member_id,
    });
  }

  // Prepare all balance and account operations
  const balanceOperations = [];
  const accountOperations = [];

  for (const account of accounts) {
    const balances = account?.balances ?? default_balance;
    const accountData = extractAccountData(account, balances);

    // Queue balance upsert operation
    // Note: Logic duplicated from updateBalance() for batching performance
    balanceOperations.push(
      prisma.balance.upsert({
        where: { balance_id: account.account_id },
        update: {
          available: getValueOrDefault(balances?.available, 0),
          current: getValueOrDefault(balances?.current, 0),
          limit: getValueOrDefault(balances?.limit, 0),
          iso_currency_code: getValueOrDefault(balances?.iso_currency_code, ""),
          unofficial_currency_code: getValueOrDefault(
            balances?.unofficial_currency_code,
            ""
          ),
          updated_at: new Date(),
        },
        create: {
          balance_id: account.account_id,
          available: getValueOrDefault(balances?.available, 0),
          current: getValueOrDefault(balances?.current, 0),
          limit: getValueOrDefault(balances?.limit, 0),
          iso_currency_code: getValueOrDefault(balances?.iso_currency_code, ""),
          unofficial_currency_code: getValueOrDefault(
            balances?.unofficial_currency_code,
            ""
          ),
        },
      })
    );
    const account_id = account.account_id;
    // Queue account upsert operation
    accountOperations.push(
      prisma.account.upsert({
        where: { account_id },
        update: {
          ...accountData,
          updated_at: new Date(),
        },
        create: {
          member: { connect: { member_id: map.get(account_id).member_id } },
          account_id: getValueOrDefault(account_id, ""),
          ...accountData,
          user: { connect: { user_id: map.get(account_id).user_id } },
          item: { connect: { item_id: account?.item_id ?? "" } },
          balance: {
            connect: { balance_id: account?.account_id ?? "" },
          },
        },
      })
    );
  }

  // Execute all operations in a single transaction
  try {
    const res = await prisma.$transaction([
      ...balanceOperations,
      ...accountOperations,
    ]);
    return res;
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
