import { prisma } from "@/lib/prisma";
import { Security } from "@/types/plaid";
import isoToUTC from "@/utils/api-helpers/isoToUTC";
import { getValueOrDefault } from "@/utils/helper-functions/getValueOrDefaultValue";

export async function updateSecurities(
  securities: Security[] ,
  user_id: string,
  timestamp: string
) {
  for (let security of securities) {
    await prisma.security.upsert({
      where: { security_id: security.security_id },
      update: {
        close_price: getValueOrDefault(security?.close_price, 0),
        close_price_as_of: isoToUTC(security?.close_price_as_of),
        name: getValueOrDefault(security?.name, ""),
        update_datetime: isoToUTC(security?.update_datetime),
        sector: getValueOrDefault(security?.sector, ""),
        industry: getValueOrDefault(security?.industry, ""),
        ticker_symbol: getValueOrDefault(security?.ticker_symbol, ""),
        timestamp: isoToUTC(timestamp),
      },
      create: {
        user_id: user_id,
        ticker_symbol: getValueOrDefault(security?.ticker_symbol, ""),
        security_id: security.security_id,
        close_price: getValueOrDefault(security?.close_price, 0),
        close_price_as_of: isoToUTC(security?.close_price_as_of),
        name: getValueOrDefault(security?.name, ""),
        sector: getValueOrDefault(security?.sector, ""),
        industry: getValueOrDefault(security?.industry, ""),
        isin: getValueOrDefault(security?.isin, ""),
        cusip: getValueOrDefault(security?.cusip, ""),
        sedol: getValueOrDefault(security?.sedol, ""),
        update_datetime: isoToUTC(security?.update_datetime),
        institution_security_id: getValueOrDefault(
          security?.institution_security_id,
          ""
        ),
        institution_id: getValueOrDefault(security?.institution_id, ""),
        proxy_security_id: getValueOrDefault(security?.proxy_security_id, ""),
        is_cash_equivalent: getValueOrDefault(
          security?.is_cash_equivalent,
          false
        ),
        type: getValueOrDefault(security?.type, ""),
        iso_currency_code: getValueOrDefault(security?.iso_currency_code, ""),
        unofficial_currency_code: getValueOrDefault(
          security?.unofficial_currency_code,
          ""
        ),
        market_identifier_code: getValueOrDefault(
          security?.market_identifier_code,
          ""
        ),
        timestamp: isoToUTC(timestamp),
      },
    });

    await prisma.securityHistory.create({
      data: {
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
        is_cash_equivalent: getValueOrDefault(
          security?.is_cash_equivalent,
          false
        ),
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
        timestamp: isoToUTC(timestamp),
        sector: getValueOrDefault(security?.sector, ""),
        industry: getValueOrDefault(security?.industry, ""),
      },
    });
  }
}
