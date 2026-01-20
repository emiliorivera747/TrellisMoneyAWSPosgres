import { Security } from "plaid";
import { db } from "@/drizzle/db";
import { security } from "@/drizzle/schema";
import { valueOrDefault } from "@/utils/helper-functions/formatting/getValueOrDefaultValue";
import isoToUTC from "@/utils/api-helpers/dates/isoToUTC";
import { getServerErrorMessage } from "@/utils/api-helpers/errors/getServerErrorMessage";
import { sql } from "drizzle-orm";
import { Security as SecurityDrizzle } from "@/drizzle/schema";

interface UpsertSecuritiesParams {
  securitiesPlaid: Security[];
  timestamp: string;
}

/**
 * Upserts the securities into the database using Drizzle
 * Note: In Drizzle schema, securities are standalone entities without user_id or household_id
 */
export const upsertSecurities = async ({
  securitiesPlaid,
  timestamp,
}: UpsertSecuritiesParams): Promise<{
  securityUpserts: SecurityDrizzle[];
}> => {
  try {
    if (securitiesPlaid.length === 0) {
      return { securityUpserts: [] };
    }

    const values = securitiesPlaid.map((securityPlaid) => ({
      securityId: securityPlaid.security_id,
      institutionId: securityPlaid.institution_id || null,
      proxySecurityId: securityPlaid.proxy_security_id || null,
      securityName: securityPlaid.name || null,
      tickerSymbol: securityPlaid.ticker_symbol || null,
      isCashEquivalent: securityPlaid.is_cash_equivalent || false,
      type: securityPlaid.type || null,
      subtype: securityPlaid.subtype || null,
      closePrice: securityPlaid.close_price
        ? valueOrDefault(securityPlaid.close_price, 0).toString()
        : null,
      closePriceAsOf: securityPlaid.close_price_as_of || null,
      updateDatetime: securityPlaid.update_datetime
        ? isoToUTC(securityPlaid.update_datetime).toISOString()
        : null,
      isoCurrencyCode: securityPlaid.iso_currency_code || null,
      sector: securityPlaid.sector || null,
      industry: securityPlaid.industry || null,
    }));

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
          subtype: sql`excluded.subtype`,
          closePrice: sql`excluded.close_price`,
          closePriceAsOf: sql`excluded.close_price_as_of`,
          updateDatetime: sql`excluded.update_datetime`,
          isoCurrencyCode: sql`excluded.iso_currency_code`,
          sector: sql`excluded.sector`,
          industry: sql`excluded.industry`,
          updatedAt: sql`CURRENT_TIMESTAMP`,
        },
      })
      .returning();

    return { securityUpserts };
  } catch (error) {
    console.error("Error upserting securities:", getServerErrorMessage(error));
    throw new Error(getServerErrorMessage(error));
  }
};
