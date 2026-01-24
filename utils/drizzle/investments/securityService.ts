// Drizzle
import { db } from "@/drizzle/db";
import { security } from "@/drizzle/schema";
import { sql } from "drizzle-orm";
import { Security as SecurityDrizzle } from "@/drizzle/schema";

// Utils
import { logErrorAndThrow } from "@/utils/api-helpers/errors/logAndThrowError";
import { valueOrDefault } from "@/utils/helper-functions/formatting/getValueOrDefaultValue";
import isoToUTC from "@/utils/api-helpers/dates/isoToUTC";

// Types
import { Security } from "plaid";

export interface UpsertSecuritiesParamsWithoutTx {
  plaidSecurities: Security[];
  timestamp?: string;
}

/**
 * Upserts the securities into the database using Drizzle
 * Note: In Drizzle schema, securities are standalone entities without user_id or household_id
 */
export const upsertSecurities = async ({
  plaidSecurities,
  timestamp,
}: UpsertSecuritiesParamsWithoutTx): Promise<{
  securityUpserts: SecurityDrizzle[];
}> => {
  try {
    if (plaidSecurities.length === 0) return { securityUpserts: [] };

    const values = getSecurityValues(plaidSecurities);

    const securityUpserts = await db
      .insert(security)
      .values(values)
      .onConflictDoUpdate({
        target: security.securityId,
        set: {
          securityName: sql`excluded.security_name`,
          tickerSymbol: sql`excluded.ticker_symbol`,
          isCashEquivalent: sql`excluded.is_cash_equivalent`,
          type: sql`excluded.type`,
          closePrice: sql`excluded.close_price`,
          closePriceAsOf: sql`excluded.close_price_as_of`,
          updateDatetime: sql`excluded.update_datetime`,
          isoCurrencyCode: sql`excluded.iso_currency_code`,
          sector: sql`excluded.sector`,
          industry: sql`excluded.industry`,
          updatedAt: timestamp ? timestamp : sql`CURRENT_TIMESTAMP`,
        },
      })
      .returning();
    return { securityUpserts };
  } catch (error) {
    return logErrorAndThrow(error);
  }
};

const getSecurityValues = (securitiesPlaid: Security[]) => {
  const values = securitiesPlaid.map((securityPlaid) => ({
    securityId: valueOrDefault(securityPlaid.security_id, ""),
    institutionId: valueOrDefault(securityPlaid.institution_id, null),
    proxySecurityId: valueOrDefault(securityPlaid.proxy_security_id, null),
    securityName: valueOrDefault(securityPlaid.name, null),
    tickerSymbol: valueOrDefault(securityPlaid.ticker_symbol, null),
    isCashEquivalent: valueOrDefault(securityPlaid.is_cash_equivalent, false),
    type: valueOrDefault(
      securityPlaid.type?.toUpperCase(),
      null
    ),
    closePrice: valueOrDefault(securityPlaid.close_price?.toString(), null),
    closePriceAsOf: valueOrDefault(securityPlaid.close_price_as_of, null),
    updateDatetime: securityPlaid.update_datetime
      ? isoToUTC(
          valueOrDefault(securityPlaid.update_datetime, null)
        ).toISOString()
      : null,
    isoCurrencyCode: valueOrDefault(securityPlaid.iso_currency_code, null),
    sector: valueOrDefault(securityPlaid.sector, null),
    industry: valueOrDefault(securityPlaid.industry, null),
  }));
  return values;
};
