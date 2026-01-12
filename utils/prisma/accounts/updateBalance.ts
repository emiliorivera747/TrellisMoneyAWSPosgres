import prisma from "@/lib/prisma";
import { Balance } from "@/types/services/plaid/plaid";
import { valueOrDefault } from "@/utils/helper-functions/formatting/getValueOrDefaultValue";

export async function updateBalance(balance: Balance, account_id: string) {
  const dbResponse = await prisma.balance.upsert({
    where: { balance_id: account_id },
    update: {
      available: valueOrDefault(balance?.available, 0),
      current: valueOrDefault(balance?.current, 0),
      limit: valueOrDefault(balance?.limit, 0),
      iso_currency_code: valueOrDefault(balance?.iso_currency_code, ""),
      unofficial_currency_code: valueOrDefault(
        balance?.unofficial_currency_code,
        ""
      ),
      updated_at: new Date(),
    },
    create: {
      balance_id: account_id,
      available: valueOrDefault(balance?.available, 0),
      current: valueOrDefault(balance?.current, 0),
      limit: valueOrDefault(balance?.limit, 0),
      iso_currency_code: valueOrDefault(balance?.iso_currency_code, ""),
      unofficial_currency_code: valueOrDefault(
        balance?.unofficial_currency_code,
        ""
      ),
    },
  });
  return dbResponse;
}
