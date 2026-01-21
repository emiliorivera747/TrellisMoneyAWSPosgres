// Drizzle
import { security } from "@/drizzle/schema";
import { sql } from "drizzle-orm";

// Types
import { UpsertSecuritiesParams } from "@/types/utils/drizzle/investments/securityService";
import { Security } from "plaid";

// Utils
import { buildConflictUpdateColumns } from "@/utils/drizzle/helpers/buildConflictUpdateColumns";

/**
 * Upserts the securities into the database using Drizzle
 * Note: In Drizzle schema, securities are standalone entities without user_id or household_id
 */
export const updateSecuritiesInTx = async ({
  tx,
  plaidSecurities,
  timestamp,
}: UpsertSecuritiesParams) => {
  if (plaidSecurities.length === 0) return [];
  const values = getSecurityValues(plaidSecurities);
  const deduplicatedValues = Array.from(
    new Map(values.map((v) => [v.securityId, v])).values()
  );

  const securityUpserts = await tx
    .insert(security)
    .values(deduplicatedValues)
    .onConflictDoUpdate({
      target: security.securityId,
      set: {
        institutionId: sql`excluded.institution_id`,
        proxySecurityId: sql`excluded.proxy_security_id`,
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
        updatedAt: sql`now()`,
      },
    })
    .returning();

  return securityUpserts;
};

/**
 * Transforms an array of Plaid security objects into a standardized format.
 *
 * @param securitiesPlaid - An array of security objects from Plaid.
 * @returns An array of transformed security values with defaulted and formatted fields.
 */
const getSecurityValues = (securitiesPlaid: Security[]) => {
  const values = securitiesPlaid.map((securityPlaid) => ({
    securityId: securityPlaid.security_id,
    institutionId: securityPlaid.institution_id ?? null,
    proxySecurityId: securityPlaid.proxy_security_id ?? null,
    securityName: securityPlaid.name ?? null,
    tickerSymbol: securityPlaid.ticker_symbol ?? null,
    isCashEquivalent: securityPlaid.is_cash_equivalent ?? false,
    type: securityPlaid.type ?? null,
    closePrice: securityPlaid.close_price ?? null,
    closePriceAsOf: securityPlaid.close_price_as_of ?? null,
    updateDatetime: securityPlaid.update_datetime
      ? new Date(securityPlaid.update_datetime).toISOString()
      : null,
    isoCurrencyCode: securityPlaid.iso_currency_code ?? null,
    sector: securityPlaid.sector ?? null,
    industry: securityPlaid.industry ?? null,
  }));
  return values;
};
