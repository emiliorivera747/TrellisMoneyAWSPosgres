import {updateBalance} from "@/utils/api-helpers/plaid/updateBalance";
import { prisma } from "@/lib/prisma";
import { Account } from "@/types/plaid";
import { getValueOrDefault } from "@/utils/helper-functions/getValueOrDefaultValue";


export async function updateAccounts(accounts: Account[], userId: string) {
  try {
    for (let account of accounts) {
      if (!account.balances) continue;
      const balanceRes = await updateBalance(account?.balances, account?.account_id);
      if (!balanceRes) throw new Error("Error updating balance");
      await prisma.account.upsert({
        where: { account_id: account.account_id },
        update: {
          name: getValueOrDefault(account?.name, ""),
          type: getValueOrDefault(account?.type, ""),
          available: getValueOrDefault(account?.balances?.available, 0),
          current: getValueOrDefault(account?.balances?.current, 0),
          limit: getValueOrDefault(account?.balances?.limit, 0),
          iso_currency_code: getValueOrDefault(account?.balances?.iso_currency_code, ""),
          timestamp: new Date(),
        },
        create: {
          account_id: getValueOrDefault(account?.account_id, ""),
          balance_id: account.account_id,
          name: getValueOrDefault(account?.name, ""),
          type: getValueOrDefault(account?.type, ""),
          available: getValueOrDefault(account?.balances?.available, 0),
          current: getValueOrDefault(account?.balances?.current, 0),
          iso_currency_code: getValueOrDefault(account?.balances?.iso_currency_code, ""),
          limit: getValueOrDefault(account?.balances?.limit, 0),
          user_id: userId,
          unofficial_currency_code: getValueOrDefault(account?.balances?.unofficial_currency_code, ""),
        },
      });
  
      await prisma.accountHistory.create({
        data: {
          account_id: account.account_id,
          name: getValueOrDefault(account?.name, ""),
          type: getValueOrDefault(account?.type, ""),
          available: getValueOrDefault(account?.balances?.available, 0),
          current: getValueOrDefault(account?.balances?.current, 0),
          limit: getValueOrDefault(account?.balances?.limit, 0),
          iso_currency_code: getValueOrDefault(account?.balances?.iso_currency_code, ""),
          unofficial_currency_code: getValueOrDefault(account?.balances?.unofficial_currency_code, ""),
          user_id: userId,
        },
      });
    }
  } catch (error) {
    return { error: error instanceof Error ? error.message : String(error) };
    
  }

}


