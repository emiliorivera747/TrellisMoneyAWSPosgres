import {updateBalance} from "@/utils/api-helpers/plaid/updateBalance";
import { prisma } from "@/lib/prisma";
import { Account } from "@/types/plaid";
 
 export async function updateAccounts(accounts: Account[], userId: string) {
    for (let account of accounts) {
      await updateBalance(account.balances, account.account_id);
      await prisma.account.upsert({
        where: { account_id: account.account_id },
        update: {
          name: account.name,
          type: account.type,
          available: account.balances?.available ?? 0,
          current: account.balances?.current ?? 0,
          limit: account.balances?.limit ?? 0,
          iso_currency_code: account.balances?.iso_currency_code ?? "",
          timestamp: new Date(),
        },
        create: {
          account_id: account.account_id,
          balance_id: account.account_id,
          name: account.name,
          type: account.type,
          available: account.balances?.available ?? 0,
          current: account.balances?.current ?? 0,
          iso_currency_code: account.balances?.iso_currency_code ?? "",
          limit: account.balances.limit ?? 0,
          user_id: userId,
          unofficial_currency_code:
            account.balances?.unofficial_currency_code ?? "",
        },
      });
  
      await prisma.accountHistory.create({
        data: {
          account_id: account.account_id,
          name: account.name,
          type: account.type,
          available: account.balances?.available ?? 0,
          current: account.balances?.current ?? 0,
          limit: account.balances?.limit ?? 0,
          iso_currency_code: account.balances?.iso_currency_code ?? "",
          unofficial_currency_code:
            account.balances?.unofficial_currency_code ?? "",
          user_id: userId,
        },
      });
    }
  }