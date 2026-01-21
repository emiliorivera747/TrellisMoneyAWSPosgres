// Drizzle
import { security } from "@/drizzle/schema";
import { sql } from "drizzle-orm";
import { SecurityType } from "@/drizzle/schema";

// Utils
import { valueOrDefault } from "@/utils/helper-functions/formatting/getValueOrDefaultValue";
import isoToUTC from "@/utils/api-helpers/dates/isoToUTC";

// Types
import { UpsertSecuritiesParams } from "@/types/utils/drizzle/investments/securityService";
import { Security } from "plaid";

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
  // Return early if there are no securities to process
  if (plaidSecurities.length === 0) return [];

  // Map Plaid securities to database-compatible values
  const values = getSecurityValues(plaidSecurities);

  // Perform upsert operation in the database
  const securityUpserts = await tx
    .insert(security) // Insert into the security table
    .values(values) // Use mapped values
    .onConflictDoUpdate({
      target: security.securityId, // Conflict resolution based on securityId
      set: {
        // Update fields on conflict
        securityName: sql`excluded.security_name`,
        tickerSymbol: sql`excluded.ticker_symbol`,
        isCashEquivalent: sql`excluded.is_cash_equivalent`,
        type: sql`excluded.type`,
        subtype: sql`excluded.subtype`,
        closePrice: sql`excluded.close_price`,
        closePriceAsOf: sql`excluded.close_price_as_of`,
        updateDatetime: sql`excluded.update_datetime`,
        isoCurrencyCode: sql`excluded.iso_currency_code`,
        sector: sql`excluded.sector`,
        industry: sql`excluded.industry`,
        updatedAt: timestamp ? timestamp : sql`CURRENT_TIMESTAMP`, // Use provided timestamp or current time
      },
    })
    .returning(); // Return the upserted rows

  // Return the result of the upsert operation
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
    securityId: valueOrDefault(securityPlaid.security_id, ""),
    institutionId: valueOrDefault(securityPlaid.institution_id, null),
    proxySecurityId: valueOrDefault(securityPlaid.proxy_security_id, null),
    securityName: valueOrDefault(securityPlaid.name, null),
    tickerSymbol: valueOrDefault(securityPlaid.ticker_symbol, null),
    isCashEquivalent: valueOrDefault(securityPlaid.is_cash_equivalent, false),
    type: valueOrDefault(
      securityPlaid.type?.toUpperCase(),
      null
    ) as SecurityType,
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
