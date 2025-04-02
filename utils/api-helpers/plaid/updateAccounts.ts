import { updateBalance } from "@/utils/api-helpers/plaid/updateBalance";
import { prisma } from "@/lib/prisma";
import { Account } from "@/types/plaid";
import { getValueOrDefault } from "@/utils/helper-functions/getValueOrDefaultValue";

//helpers
import { hasAccountBalance } from "@/utils/api-helpers/hasAccountBalance";


/**
 * 
 * 
 * @param accounts 
 * @param userId 
 */
export async function updateAccounts(accounts: Account[], userId: string) {
  
  
  for (let account of accounts) {
    hasAccountBalance(account);
    
    await updateBalance(
      account?.balances ?? { available: 0, current: 0, limit: 0, iso_currency_code: "", unofficial_currency_code: "" },
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
      where: { account_id: account.account_id },
      update: {
        name: getValueOrDefault(account?.name, ""),
        type: getValueOrDefault(account?.type, ""),
        subtype: getValueOrDefault(account?.subtype, ""),
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
        type: getValueOrDefault(account?.type, ""),
        subtype: getValueOrDefault(account?.subtype, ""),
        available: getValueOrDefault(account?.balances?.available, 0),
        current: getValueOrDefault(account?.balances?.current, 0),
        iso_currency_code: getValueOrDefault(
          account?.balances?.iso_currency_code,
          ""
        ),
        limit: getValueOrDefault(account?.balances?.limit, 0),
        user_id: userId,
        unofficial_currency_code: getValueOrDefault(
          account?.balances?.unofficial_currency_code,
          ""
        ),
        item_id: getValueOrDefault(account?.item_id, ""),
      },
    });

    /**
     * Create account history
     */
    await prisma.accountHistory.create({
      data: {
        account_id: account.account_id,
        name: getValueOrDefault(account?.name, ""),
        type: getValueOrDefault(account?.type, ""),
        available: getValueOrDefault(account?.balances?.available, 0),
        current: getValueOrDefault(account?.balances?.current, 0),
        limit: getValueOrDefault(account?.balances?.limit, 0),
        iso_currency_code: getValueOrDefault(
          account?.balances?.iso_currency_code,
          ""
        ),
        unofficial_currency_code: getValueOrDefault(
          account?.balances?.unofficial_currency_code,
          ""
        ),
        user_id: userId,
      },
    });
  }
}
