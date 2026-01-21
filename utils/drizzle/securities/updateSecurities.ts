// Drizzle
import { security } from "@/drizzle/schema";
import { sql } from "drizzle-orm";

// Types
import { UpsertSecuritiesParams } from "@/types/utils/drizzle/investments/securityService";
import { Security } from "plaid";

import { logErrorAndThrow } from "@/utils/api-helpers/errors/logAndThrowError";

/**
 * Upserts the securities into the database using Drizzle
 * Note: In Drizzle schema, securities are standalone entities without user_id or household_id
 */
/**
 * Updates securities in the database within a transaction by performing an upsert operation.
 *
 * @param {Object} params - The parameters for the update operation.
 * @param {Transaction} params.tx - The database transaction object.
 * @param {Array} params.plaidSecurities - An array of securities to be upserted.
 * @param {string | null} params.timestamp - Optional timestamp to set for the updated records.
 *
 * @returns {Promise<Array>} A promise that resolves to an array of upserted securities.
 */
export const updateSecuritiesInTx = async ({
  tx,
  plaidSecurities,
  timestamp,
}: UpsertSecuritiesParams) => {
  try {
    if (plaidSecurities.length === 0) return [];
    const values = getSecurityValues(plaidSecurities);
    const securityUpserts = await tx
      .insert(security)
      .values(values)
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
        },
      })
      .returning();
    console.log(securityUpserts);

    return securityUpserts;
  } catch (error) {
    return logErrorAndThrow(error);
  }
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
