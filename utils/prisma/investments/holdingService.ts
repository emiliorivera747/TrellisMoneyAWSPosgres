import prisma from "@/lib/prisma";
import { Holding as HoldingPlaid } from "plaid";
import { Holding as HoldingPrisma } from "@/types/services/plaid/plaid";
import { valueOrDefault } from "@/utils/helper-functions/formatting/getValueOrDefaultValue";
import isoToUTC from "@/utils/api-helpers/dates/isoToUTC";
import { getUser } from "@/services/supabase/getUser";
import { getServerErrorMessage } from "@/utils/api-helpers/errors/getServerErrorMessage";

interface UpsertHoldingsProps {
  holdingsPlaid: HoldingPlaid[];
  user_id: string;
  timestamp: string;
  holdingMap: Map<string, { user_id: string; member_id: string }>;
}

type UpsertHoldingsResponse = Promise<{
  holdingUpserts: HoldingPrisma[];
}>;

/**
 *
 * Upserts the holdings into the database and returns the holding history
 *
 * @param holdings
 * @param securities
 * @param timestamp
 * @param user_id
 * @returns
 */
export const upsertHoldings = async ({
  holdingsPlaid,
  user_id,
  timestamp,
  holdingMap,
}: UpsertHoldingsProps): UpsertHoldingsResponse => {
  try {
    const holdingUpserts = await Promise.all(
      holdingsPlaid.map(
        async (holdingPlaid) =>
          await prisma.holding.upsert({
            where: {
              security_id_user_id_account_id: {
                security_id: holdingPlaid.security_id,
                account_id: holdingPlaid.account_id,
                user_id: user_id,
              },
            },
            update: {
              ...getHoldingUpdateFields(holdingPlaid),
              member_id:
                holdingMap.get(holdingPlaid.account_id)?.member_id || "",
              household_id,
            },
            create: {
              ...getHoldingCreateFields(holdingPlaid),
              user_id,
              member_id:
                holdingMap.get(holdingPlaid.account_id)?.member_id || "",
              household_id: holdingMap.get(holdingPlaid.account_id),
              created_at: timestamp,
            },
          })
      )
    );
    return { holdingUpserts };
  } catch (error) {
    console.error(getServerErrorMessage(error));
    throw new Error(getServerErrorMessage(error));
  }
};

/**
 *
 * Get all of the holdings with the security_id, account_id and user_id
 *
 * @param holdings
 * @returns
 */
export const getExistingHoldings = async (holdings: Holding[]) => {
  const user = await getUser();
  const user_id = user?.id || "";
  const res = await prisma.holding.findMany({
    where: {
      security_id: { in: holdings.map((h) => h.security_id) },
      user_id,
      account_id: { in: holdings.map((h) => h.account_id) },
    },
    select: { security_id: true, account_id: true, quantity: true },
  });
  return res;
};

// /**
//  * Adds the holding history to the holding history array
//  *
//  */
// const addHoldingHistory = (
//   holdingHistory: HoldingHistory[],
//   holdingsMap: Map<string, { member_id: string; user_id: string }>,
//   holding: Holding,
//   user_id: string
// ) => {
//   const key = `${holding.security_id}:${holding.account_id}`;
//   const existing = holdingsMap.get(key);
//   const newQuantity = holding.quantity;

//   const diff = Math.abs(Number(existing?.quantity) - Number(newQuantity));

//   if (!existing || diff > 0.01) {
//     const historyFields = getHoldingHistoryFields(holding, user_id);
//     holdingHistory.push(historyFields);
//   }
// };

// /**
//  * Get the holding history create fields
//  */
// const getHoldingHistoryFields = (holding: Holding, user_id: string) => ({
//   user_id,
//   cost_basis: getValueOrDefault(holding?.cost_basis, 0),
//   institution_price: getValueOrDefault(holding?.institution_price, 0),
//   expected_annual_return_rate: 0.06,
//   institution_price_as_of: isoToUTC(holding?.institution_price_as_of),
//   institution_price_datetime: isoToUTC(holding?.institution_price_datetime),
//   institution_value: getValueOrDefault(holding?.institution_value, 0),
//   iso_currency_code: holding.iso_currency_code || "USD",
//   unofficial_currency_code: getValueOrDefault(
//     holding?.unofficial_currency_code,
//     "USD"
//   ),
//   vested_quantity: getValueOrDefault(holding?.vested_quantity, 0),
//   vested_value: getValueOrDefault(holding?.vested_value, 0),
//   quantity: getValueOrDefault(holding?.quantity, 0),
//   security_id: holding.security_id,
//   account_id: holding.account_id,
// });

/**
 * Get the holding update fields
 */
const getHoldingUpdateFields = (holding: Holding) => ({
  cost_basis: valueOrDefault(holding?.cost_basis, 0),
  institution_price: valueOrDefault(holding?.institution_price, 0),
  institution_price_as_of: isoToUTC(holding?.institution_price_as_of),
  institution_price_datetime: isoToUTC(holding?.institution_price_datetime),
  institution_value: valueOrDefault(holding?.institution_value, 0),
  vested_quantity: valueOrDefault(holding?.vested_quantity, 0),
  vested_value: valueOrDefault(holding?.vested_value, 0),
  quantity: valueOrDefault(holding?.quantity, 0),
  iso_currency_code: holding.iso_currency_code || "USD",
});

/**
 * Get the holding create fields
 */
const getHoldingCreateFields = (holding: Holding) => ({
  security_id: holding.security_id,
  account_id: holding.account_id,
  cost_basis: valueOrDefault(holding?.cost_basis, 0),
  institution_price: valueOrDefault(holding?.institution_price, 0),
  institution_price_as_of: isoToUTC(holding?.institution_price_as_of),
  institution_price_datetime: isoToUTC(holding?.institution_price_datetime),
  institution_value: valueOrDefault(holding?.institution_value, 0),
  vested_quantity: valueOrDefault(holding?.vested_quantity, 0),
  vested_value: valueOrDefault(holding?.vested_value, 0),
  quantity: valueOrDefault(holding?.quantity, 0),
  iso_currency_code: holding.iso_currency_code || "USD",
});
