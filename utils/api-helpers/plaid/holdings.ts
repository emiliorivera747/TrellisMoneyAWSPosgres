import { prisma } from "@/lib/prisma";
import { getValueOrDefault } from "@/utils/helper-functions/getValueOrDefaultValue";
import isoToUTC from "@/utils/api-helpers/isoToUTC";
import { Holding } from "@/types/plaid";


/**
 * Creates a new holding history record in the database
 * 
 * @param holding 
 * @param timestamp 
 */
export const createHoldingHistory = async (holding: Holding, timestamp: string, user_id: string) => {
  await prisma.holdingHistory.create({
    data: {
      cost_basis: getValueOrDefault(holding?.cost_basis, 0),
      institution_price: getValueOrDefault(holding?.institution_price, 0),
      institution_value: getValueOrDefault(holding?.institution_value, 0),
      quantity: getValueOrDefault(holding?.quantity, 0),
      vested_quantity: getValueOrDefault(holding?.vested_quantity, 0),
      vested_value: getValueOrDefault(holding?.vested_value, 0),
      institution_price_as_of: isoToUTC(holding?.institution_price_as_of),
      institution_price_datetime: isoToUTC(holding?.institution_price_datetime),
      iso_currency_code: getValueOrDefault(holding?.iso_currency_code, ""),
      unofficial_currency_code: getValueOrDefault(
        holding?.unofficial_currency_code,
        ""
      ),
      account_id: getValueOrDefault(holding?.account_id, ""),
      security_id: getValueOrDefault(holding?.security_id, ""),
      user_id: user_id,
      timestamp: isoToUTC(timestamp),
    },
  });
};

/**
 * 
 * Will update or create a holding record in the database
 * 
 * @param holding 
 * @param timestamp 
 */
export const updateOrCreateHolding = async (holding: Holding, timestamp: string, user_id: string) => {
await prisma.holding.upsert({
    where: {
        holding_id: {
            account_id: getValueOrDefault(holding?.account_id, ""),
            security_id: getValueOrDefault(holding?.security_id, ""),
            user_id: user_id,
        },
    },
    update: {
        cost_basis: getValueOrDefault(holding?.cost_basis, 0),
        institution_price: getValueOrDefault(holding?.institution_price, 0),
        institution_value: getValueOrDefault(holding?.institution_value, 0),
        quantity: getValueOrDefault(holding?.quantity, 0),
        vested_quantity: getValueOrDefault(holding?.vested_quantity, 0),
        vested_value: getValueOrDefault(holding?.vested_value, 0),
        institution_price_as_of: isoToUTC(holding?.institution_price_as_of),
        institution_price_datetime: isoToUTC(holding?.institution_price_datetime),
        iso_currency_code: getValueOrDefault(holding?.iso_currency_code, ""),
        unofficial_currency_code: getValueOrDefault(
            holding?.unofficial_currency_code,
            ""
        ),
        timestamp: isoToUTC(timestamp),
    },
    create: {
        user_id: getValueOrDefault(user_id, ""),
        account_id: getValueOrDefault(holding?.account_id, ""),
        cost_basis: getValueOrDefault(holding?.cost_basis, 0),
        institution_price: getValueOrDefault(holding?.institution_price, 0),
        institution_value: getValueOrDefault(holding?.institution_value, 0),
        quantity: getValueOrDefault(holding?.quantity, 0),
        vested_quantity: getValueOrDefault(holding?.vested_quantity, 0),
        vested_value: getValueOrDefault(holding?.vested_value, 0),
        security_id: getValueOrDefault(holding?.security_id, ""),
        institution_price_as_of: isoToUTC(holding?.institution_price_as_of),
        institution_price_datetime: isoToUTC(holding?.institution_price_datetime),
        iso_currency_code: getValueOrDefault(holding?.iso_currency_code, ""),
        unofficial_currency_code: getValueOrDefault(
            holding?.unofficial_currency_code,
            ""
        ),
        timestamp: isoToUTC(timestamp),
    },
});
};

/**
 * 
 * Returns all holdings for a user
 * 
 * @param user_id 
 * @returns 
 */
export const getAllHoldingsWithIds = async (user_id: string) => {
  const userHoldings = await prisma.holding.findMany({
    where: {
      user_id: user_id,
    },
  });

  return userHoldings;
};
