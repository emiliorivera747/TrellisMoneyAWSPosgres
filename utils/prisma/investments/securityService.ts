import { Security } from "plaid";
import { Security as SecurityPrisma } from "@/types/services/plaid/plaid";
import { getValueOrDefault } from "@/utils/helper-functions/formatting/getValueOrDefaultValue";
import { Decimal } from "@prisma/client/runtime/library";
import prisma from "@/lib/prisma";
import isoToUTC from "@/utils/api-helpers/dates/isoToUTC";
import { getServerErrorMessage } from "@/utils/api-helpers/errors/getServerErrorMessage";

interface UpsertSecuritiesParams {
  securitiesPlaid: Security[];
  user_id: string;
  timestamp: string;
  securityMap: Map<string, { member_id: string }>;
  household_id: string;
}


/**
 *  Upserts the securities into the database and returns the security history
 */
export const upsertSecurities = async ({
  securitiesPlaid,
  user_id,
  timestamp,
  securityMap,
  household_id,
}: UpsertSecuritiesParams): Promise<{
  securityUpserts: SecurityPrisma[];
}> => {
  try {
    const securityUpserts = await Promise.all(
      securitiesPlaid.map(
        async (security) =>
          await prisma.security.upsert({
            where: { security_id: security.security_id },
            update: {
              ...extractSecurityUpdateData(security),
              timestamp: isoToUTC(timestamp),
            },
            create: {
              ...getSecurityCreateFields(security),
              timestamp: isoToUTC(timestamp),
              user_id: user_id,
              member_id: securityMap.get(security.security_id)?.member_id || "",
              household_id,
            },
          })
      )
    );
    return { securityUpserts };
  } catch (error) {
    console.error("Error upserting securities:", getServerErrorMessage(error));
    throw new Error(getServerErrorMessage(error));
  }
};

/**
 * Compares the securities from plaid with the securities in the database
 * and returns the securities in the database.
 *
 * @param securities
 */
export const getExistingSecurities = async (securities: Security[]) => {
  const res = await prisma.security.findMany({
    where: {
      security_id: { in: securities.map((security) => security.security_id) },
    },
    select: { security_id: true, close_price: true },
  });
  return res;
};


/**
 * Adds the security history to the security history array
 * if the security does not exist in the database or if the price has changed
 *
 * @param securityHistory
 * @param securitiesMap
 * @param security
 */
const addSecurityHistory = async (
  securityHistory: any[],
  securitiesMap: Map<
    string,
    { security_id: string; close_price: number | Decimal | null }
  >,
  security: Security
) => {
  const existing = securitiesMap.get(security.security_id);
  const newPrice = getValueOrDefault(security.close_price, 0);
  if (
    !existing ||
    Math.abs(Number(existing?.close_price) - Number(newPrice)) > 0.01
  ) {
    const historyFields = getSecurityHistoryFields(security);
    securityHistory.push(historyFields);
  }
};

/**
 *
 * Get the security history create fields
 *
 * @param security
 * @returns
 */
const getSecurityHistoryFields = (security: Security) => ({
  security_id: security.security_id,
  name: getValueOrDefault(security?.name, ""),
  close_price: getValueOrDefault(security?.close_price, 0),
  close_price_as_of: isoToUTC(security?.close_price_as_of),
  ticker_symbol: getValueOrDefault(security?.ticker_symbol, ""),
  update_datetime: isoToUTC(
    security?.update_datetime || new Date().toISOString()
  ),
});

/**
 *
 * Get the security create fields
 *
 * @param security
 * @returns
 */
const getSecurityCreateFields = (security: Security) => ({
  security_id: security.security_id,
  isin: getValueOrDefault(security?.isin, ""),
  cusip: getValueOrDefault(security?.cusip, ""),
  sedol: getValueOrDefault(security?.sedol, ""),
  institution_security_id: getValueOrDefault(
    security?.institution_security_id,
    ""
  ),
  institution_id: getValueOrDefault(security?.institution_id, ""),
  proxy_security_id: getValueOrDefault(security?.proxy_security_id, ""),
  name: getValueOrDefault(security?.name, ""),
  ticker_symbol: getValueOrDefault(security?.ticker_symbol, ""),
  is_cash_equivalent: getValueOrDefault(security?.is_cash_equivalent, false),
  type: getValueOrDefault(security?.type, ""),
  close_price: getValueOrDefault(security?.close_price, 0),
  close_price_as_of: isoToUTC(security?.close_price_as_of),
  update_datetime: isoToUTC(security?.update_datetime),
  iso_currency_code: getValueOrDefault(security?.iso_currency_code, ""),
  unofficial_currency_code: getValueOrDefault(
    security?.unofficial_currency_code,
    ""
  ),
  market_identifier_code: getValueOrDefault(
    security?.market_identifier_code,
    ""
  ),
});

/**
 *
 * Get the security update fields
 *
 * @param security
 * @returns
 */
const extractSecurityUpdateData = (security: Security) => ({
  close_price: getValueOrDefault(security?.close_price, 0),
  close_price_as_of: isoToUTC(security?.close_price_as_of),
  name: getValueOrDefault(security?.name, ""),
  update_datetime: isoToUTC(security?.update_datetime),
  sector: getValueOrDefault(security?.sector, ""),
  industry: getValueOrDefault(security?.industry, ""),
  ticker_symbol: getValueOrDefault(security?.ticker_symbol, ""),
});
