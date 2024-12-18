import { prisma } from "@/lib/prisma";
import { Balance } from "@/types/plaid";

export async function updateBalance(balance: Balance, account_id: string) {
    await prisma.balance.upsert({
      where: { balance_id: account_id },
      update: {
        available: balance.available ?? 0,
        current: balance.current ?? 0,
        limit: balance.limit ?? 0,
        iso_currency_code: balance.iso_currency_code ?? "",
        unofficial_currency_code: balance.unofficial_currency_code ?? "",
        updated_at: new Date(),
      },
      create: {
        balance_id: account_id,
        available: balance.available ?? 0,
        current: balance.current ?? 0,
        limit: balance.limit ?? 0,
        iso_currency_code: balance.iso_currency_code ?? "",
        unofficial_currency_code: balance.unofficial_currency_code ?? "",
      },
    });
  }


