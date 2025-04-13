import { prisma } from "@/lib/prisma";
import { AccountBase } from "plaid";
import { getValueOrDefault } from "@/utils/helper-functions/getValueOrDefaultValue";
import { AccountSubtype, AccountType } from "plaid";

// Helpers
import { hasAccountBalance } from "@/utils/api-helpers/hasAccountBalance";
import { updateBalance } from "@/utils/api-helpers/plaid/updateBalance";

/**
 * Update the accounts in the database
 */
export async function updateAccounts(
  accountBase: AccountBase[][],
  user_id: string
) {
  /**
   * Get all of the accounts
   */
  const accounts = accountBase.flat();

  for (let account of accounts) {
    hasAccountBalance(account);
    await updateBalance(
      account?.balances ?? {
        available: 0,
        current: 0,
        limit: 0,
        iso_currency_code: "",
        unofficial_currency_code: "",
      },
      account?.account_id
    );
    /**
     *  Upsert account:
     *
     *  Upsert is a combination of insert and update. If the record exists,
     *  it will update it. If it doesn't exist, it will insert it.
     *
     */
    await prisma.account.upsert({
      where: { account_id: account.account_id, user_id: user_id },
      update: {
        name: getValueOrDefault(account?.name, ""),
        type: getValueOrDefault(account?.type, "depository" as AccountType),
        subtype: getValueOrDefault(
          account?.subtype,
          "checking" as AccountSubtype
        ),
        available: getValueOrDefault(account?.balances?.available, 0),
        current: getValueOrDefault(account?.balances?.current, 0),
        limit: getValueOrDefault(account?.balances?.limit, 0),
        iso_currency_code: getValueOrDefault(
          account?.balances?.iso_currency_code,
          ""
        ),
        updated_at: new Date(),
      },
      create: {
        account_id: getValueOrDefault(account?.account_id, ""),
        name: getValueOrDefault(account?.name, ""),
        type: getValueOrDefault(account?.type, "depository" as AccountType),
        subtype: getValueOrDefault(
          account?.subtype,
          "checking" as AccountSubtype
        ),
        available: getValueOrDefault(account?.balances?.available, 0),
        current: getValueOrDefault(account?.balances?.current, 0),
        iso_currency_code: getValueOrDefault(
          account?.balances?.iso_currency_code,
          ""
        ),
        limit: getValueOrDefault(account?.balances?.limit, 0),
        unofficial_currency_code: getValueOrDefault(
          account?.balances?.unofficial_currency_code,
          ""
        ),
        user: {
          connect: { user_id: user_id }, // Connect to existing User
        },
        item:{
            connect : { item_id: account?.item_id ?? "" }, // Connect to existing Item
        },
        balance:{
          connect: { balance_id: account?.account_id ?? "" }, // Connect to existing Balance
        }
      },
    });
  }
}
