import prisma from "@/lib/prisma";
import { Security } from "@/types/services/plaid/plaid";
import isoToUTC from "@/utils/api-helpers/dates/isoToUTC";
import { valueOrDefault } from "@/utils/helper-functions/formatting/getValueOrDefaultValue";
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
  isin: valueOrDefault(security?.isin, ""),
  cusip: valueOrDefault(security?.cusip, ""),
  sedol: valueOrDefault(security?.sedol, ""),
  institution_security_id: valueOrDefault(
    security?.institution_security_id,
    ""
  ),
  institution_id: valueOrDefault(security?.institution_id, ""),
  proxy_security_id: valueOrDefault(security?.proxy_security_id, ""),
  name: valueOrDefault(security?.name, ""),
  ticker_symbol: valueOrDefault(security?.ticker_symbol, ""),
  is_cash_equivalent: valueOrDefault(security?.is_cash_equivalent, false),
  type: valueOrDefault(security?.type, ""),
  close_price: valueOrDefault(security?.close_price, 0),
  close_price_as_of: isoToUTC(security?.close_price_as_of),
  update_datetime: isoToUTC(security?.update_datetime),
  iso_currency_code: valueOrDefault(security?.iso_currency_code, ""),
  unofficial_currency_code: valueOrDefault(
    security?.unofficial_currency_code,
    ""
  ),
  market_identifier_code: valueOrDefault(
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
  close_price: valueOrDefault(security?.close_price, 0),
  close_price_as_of: isoToUTC(security?.close_price_as_of),
  name: valueOrDefault(security?.name, ""),
  update_datetime: isoToUTC(security?.update_datetime),
  sector: valueOrDefault(security?.sector, ""),
  industry: valueOrDefault(security?.industry, ""),
  ticker_symbol: valueOrDefault(security?.ticker_symbol, ""),
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
  close_price: valueOrDefault(security?.close_price, 0),
  close_price_as_of: isoToUTC(security?.close_price_as_of),
  ticker_symbol: valueOrDefault(security?.ticker_symbol, ""),
  name: valueOrDefault(security?.name, ""),
  update_datetime: isoToUTC(
    security?.update_datetime || new Date().toISOString()
  ),
});
