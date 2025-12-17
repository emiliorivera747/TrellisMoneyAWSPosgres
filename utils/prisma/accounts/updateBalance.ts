import { prisma } from "@/lib/prisma";
import { Balance } from "@/types/plaid";
import { getValueOrDefault } from "@/utils/helper-functions/getValueOrDefaultValue";

export async function updateBalance(balance: Balance, account_id: string) {
  const dbResponse = await prisma.balance.upsert({
    where: { balance_id: account_id },
    update: {
      available: getValueOrDefault(balance?.available, 0),
      current: getValueOrDefault(balance?.current, 0),
      limit: getValueOrDefault(balance?.limit, 0),
      iso_currency_code: getValueOrDefault(balance?.iso_currency_code, ""),
      unofficial_currency_code: getValueOrDefault(
        balance?.unofficial_currency_code,
        ""
      ),
      updated_at: new Date(),
    },
    create: {
      balance_id: account_id,
      available: getValueOrDefault(balance?.available, 0),
      current: getValueOrDefault(balance?.current, 0),
      limit: getValueOrDefault(balance?.limit, 0),
      iso_currency_code: getValueOrDefault(balance?.iso_currency_code, ""),
      unofficial_currency_code: getValueOrDefault(
        balance?.unofficial_currency_code,
        ""
      ),
    },
  });
  return dbResponse;
}
