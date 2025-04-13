import { prisma } from "@/lib/prisma";
import { AccountBase } from "plaid";
import { getValueOrDefault } from "@/utils/helper-functions/getValueOrDefaultValue";
import { AccountSubtype, AccountType } from "plaid";
/**
 * Update the accounts in the database
 */
export async function updateAccounts(accounts: AccountBase[][], user_id: string) {
  
  
    for (let account of accounts) {
    
    /**
     *  Upsert account:
     *
     *  Upsert is a combination of insert and update. If the record exists,
     *  it will update it. If it doesn't exist, it will insert it.
     *
     */
    await prisma.account.upsert({
      where: { account_id: account.account_id },
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
        balance_id: account.account_id,
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
        user_id,
        unofficial_currency_code: getValueOrDefault(
          account?.balances?.unofficial_currency_code,
          ""
        ),
      },
    });
  }
}
