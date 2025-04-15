import { prisma } from "@/lib/prisma";
import { Security } from "plaid";
import { SecurityHistory } from "@/types/prisma";
import { getValueOrDefault } from "@/utils/helper-functions/getValueOrDefaultValue";
import isoToUTC from "@/utils/api-helpers/isoToUTC";

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
 *  Upserts the securities into the database and returns the security history
 */
export const upsertSecurities = async (
  securities: Security[],
  user_id: string,
  timestamp: string,
  securitiesMap: Map<string, Security>
): Promise<Security[] | []> => {
  const securityHistory: SecurityHistory[] | [] = [];

  securities.map(async (security) => {
    addSecurityHistory(securityHistory, securitiesMap, security);

    await prisma.security.upsert({
      where: { security_id: security.security_id },
      update: {
        ...getSecurityUpdateFields(security),
        timestamp: isoToUTC(timestamp),
      },
      create: {
        ...getSecurirtyCreateFields(security),
        timestamp: isoToUTC(timestamp),
        user_id: user_id,
      },
    });
  });

  return securityHistory;
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
const getSecurirtyCreateFields = (security: Security) => ({
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
const getSecurityUpdateFields = (security: Security) => ({
  close_price: getValueOrDefault(security?.close_price, 0),
  close_price_as_of: isoToUTC(security?.close_price_as_of),
  name: getValueOrDefault(security?.name, ""),
  update_datetime: isoToUTC(security?.update_datetime),
  sector: getValueOrDefault(security?.sector, ""),
  industry: getValueOrDefault(security?.industry, ""),
  ticker_symbol: getValueOrDefault(security?.ticker_symbol, ""),
});

/**
 * Adds the security history to the security history array
 * if the security does not exist in the database or if the price has changed
 *
 * @param securityHistory
 * @param securitiesMap
 * @param security
 */
const addSecurityHistory = async (
  securityHistory: SecurityHistory[],
  securitiesMap: Map<string, Security>,
  security: Security
) => {
  const existing = securitiesMap.get(security.security_id);
  const newPrice = getValueOrDefault(security.close_price, 0);
  if (
    !existing ||
    Math.abs(Number(existing?.close_price) || 0 - Number(newPrice)) > 0.01
  ) {
    const historyFields = getSecurityHistoryFields(security);
    securityHistory.push(historyFields);
  }
};
