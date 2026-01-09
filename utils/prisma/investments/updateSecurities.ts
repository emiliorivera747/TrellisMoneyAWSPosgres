import prisma from "@/lib/prisma";
import { Security } from "@/types/services/plaid/plaid";
import isoToUTC from "@/utils/api-helpers/dates/isoToUTC";
import { getValueOrDefault } from "@/utils/helper-functions/formatting/getValueOrDefaultValue";
import { getUser } from "@/services/supabase/getUser";

/**
 *
 * Update the securities in the database
 *
 * @param securities
 * @param timestamp
 */
export async function updateSecurities(
  securities: Security[],
  timestamp: string
) {
  const user = await getUser();
  const user_id = user?.id || "";

  for (let security of securities) {
    const createFields = getSecurirtyCreateFields(security);
    const updateFields = getSecurityUpdateFields(security);
    const historyCreateFields = getSecurityHistoryCreateFields(security);

    await prisma.security.upsert({
      where: { security_id: security.security_id },
      update: {
        ...updateFields,
      },
      create: {
        user_id: user_id,
        ...createFields,
      },
    });

    await prisma.securityHistory.create({
      data: {
        ...historyCreateFields,
      },
    });
  }
}

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
  timestamp: isoToUTC(security?.timestamp),
});

/**
 *
 * Get the security history create fields
 *
 * @param security
 * @returns
 */
const getSecurityHistoryCreateFields = (security: Security) => ({
  security_id: security.security_id,
  close_price: getValueOrDefault(security?.close_price, 0),
  close_price_as_of: isoToUTC(security?.close_price_as_of),
  ticker_symbol: getValueOrDefault(security?.ticker_symbol, ""),
  name: getValueOrDefault(security?.name, ""),
  update_datetime: isoToUTC(
    security?.update_datetime || new Date().toISOString()
  ),
});
