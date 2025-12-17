import { prisma } from "@/lib/prisma";
import { AccountBalance } from "plaid";
import { getValueOrDefault } from "@/utils/helper-functions/getValueOrDefaultValue";
import { AccountSubtype, AccountType } from "plaid";

//Types
import { AccountBaseWithItemId } from "@/types/plaid";

// Helpers
import { hasAccountBalance } from "@/utils/api-helpers/plaid/accounts/hasAccountBalance";
import { NextResponse } from "next/server";
import { getUser} from "@/services/supabase/getUser";

/**
 * Update the accounts in the database
 * Optimized to use batch operations via $transaction to reduce database round-trips
 */
export async function updateAccounts(
  accountBase: AccountBaseWithItemId[][],
) {
  const accounts = accountBase.flat();
  const user = await getUser();
  const user_id = user?.id || "";

  // Prepare all balance and account operations
  const balanceOperations = [];
  const accountOperations = [];

  for (const account of accounts) {
    hasAccountBalance(account);

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

    // Queue account upsert operation
    accountOperations.push(
      prisma.account.upsert({
        where: { account_id: account.account_id },
        update: {
          ...accountData,
          updated_at: new Date(),
        },
        create: {
          account_id: getValueOrDefault(account?.account_id, ""),
          ...accountData,
          user: {
            connect: { user_id },
          },
          item: {
            connect: { item_id: account?.item_id ?? "" },
          },
          balance: {
            connect: { balance_id: account?.account_id ?? "" },
          },
        },
      })
    );
  }

  // Execute all operations in a single transaction
  try {
    await prisma.$transaction([...balanceOperations, ...accountOperations]);
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to update accounts and balances" },
      { status: 500 }
    );
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
