import { prisma } from "@/lib/prisma";
import { AccountBalance } from "plaid";
import { getValueOrDefault } from "@/utils/helper-functions/getValueOrDefaultValue";
import { AccountSubtype, AccountType } from "plaid";

//Types
import { AccountBaseWithItemId } from "@/types/plaid";

// Helpers
import { hasAccountBalance } from "@/utils/api-helpers/hasAccountBalance";
import { updateBalance } from "@/utils/api-helpers/plaid/accounts/updateBalance";
import { NextResponse } from "next/server";

/**
 * Update the accounts in the database
 */
export async function updateAccounts(
  accountBase: AccountBaseWithItemId[][],
  user_id: string
) {
  const accounts = accountBase.flat();

  for (const account of accounts) {
    
    hasAccountBalance(account);

    const balances = account?.balances ?? default_balance;

    const balanceRes = await updateBalance(balances, account?.account_id);
    
    if (!balanceRes)
      return NextResponse.json(
        { message: "Failed to update Balance" },
        { status: 500 }
      );

    // Check if the balance was updated successfully
    const accountData = extractAccountData(account, balances);

    await prisma.account.upsert({
      where: { account_id: account.account_id },
      update: {
        ...accountData,
        updated_at: new Date(),
      },
      create: {
        account_id: getValueOrDefault(account?.account_id, ""),
        ...accountData,
        user: {
          connect: { user_id }, // Connect to existing User
        },
        item: {
          connect: { item_id: account?.item_id ?? "" },
        },
        balance: {
          connect: { balance_id: account?.account_id ?? "" },
        },
      },
    });
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
