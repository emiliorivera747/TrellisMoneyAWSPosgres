// Drizzle
import { security } from "@/drizzle/schema";
import { SQL, getTableColumns, sql } from "drizzle-orm";
import { PgTable } from "drizzle-orm/pg-core";

// Types
import { UpsertSecuritiesParams } from "@/types/utils/drizzle/investments/securityService";
import { Security } from "plaid";

const buildConflictUpdateColumns = <
  T extends PgTable,
  Q extends keyof T["_"]["columns"]
>(
  table: T,
  columns: Q[]
) => {
  const cls = getTableColumns(table);
  return columns.reduce((acc, column) => {
    const colName = cls[column].name;
    acc[column] = sql.raw(`excluded.${colName}`);
    return acc;
  }, {} as Record<Q, SQL>);
};

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
  const values = getSecurityValues(plaidSecurities, timestamp);
  const deduplicatedValues = Array.from(
    new Map(values.map((v) => [v.securityId, v])).values()
  );
  
  const securityUpserts = await tx
    .insert(security)
    .values(deduplicatedValues)
    .onConflictDoUpdate({
      target: security.securityId,
      set: {
        ...buildConflictUpdateColumns(security, [
          "institutionId",
          "proxySecurityId",
          "securityName",
          "tickerSymbol",
          "isCashEquivalent",
          "type",
          "closePrice",
          "closePriceAsOf",
          "updateDatetime",
          "isoCurrencyCode",
          "sector",
          "industry",
        ]),
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
const getSecurityValues = (
  securitiesPlaid: Security[],
  timestamp: string | undefined
) => {
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
