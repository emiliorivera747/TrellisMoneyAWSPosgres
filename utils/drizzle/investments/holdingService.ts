import { db } from "@/drizzle/db";
import { holding } from "@/drizzle/schema";
import { Holding as HoldingPlaid } from "plaid";
import { valueOrDefault } from "@/utils/helper-functions/formatting/getValueOrDefaultValue";
import isoToUTC from "@/utils/api-helpers/dates/isoToUTC";
import { sql } from "drizzle-orm";
import { Holding as HoldingDrizzle } from "@/drizzle/schema";
import { UpsertHoldingsParams } from "@/types/utils/drizzle/investments/getInvestments";
import { logErrorAndThrow } from "@/utils/api-helpers/errors/logAndThrowError";

/**
 * Upserts the holdings into the database using Drizzle
 * Note: In Drizzle schema, holdings use householdMemberId instead of user_id
 */
export const upsertHoldings = async ({
  holdingsPlaid,
  timestamp,
  holdingMap,
}: UpsertHoldingsParams): Promise<{
  holdingUpserts: HoldingDrizzle[];
}> => {
  try {
    if (holdingsPlaid.length === 0) return { holdingUpserts: [] };

    const values = getAllHoldingValues(holdingsPlaid, holdingMap);

    const holdingUpserts = await db
      .insert(holding)
      .values(values)
      .onConflictDoUpdate({
        target: holding.holdingId,
        set: {
          accountId: sql`excluded.account_id`,
          securityId: sql`excluded.security_id`,
          costBasis: sql`excluded.cost_basis`,
          institutionPrice: sql`excluded.institution_price`,
          institutionValue: sql`excluded.institution_value`,
          quantity: sql`excluded.quantity`,
          vestedQuantity: sql`excluded.vested_quantity`,
          vestedValue: sql`excluded.vested_value`,
          institutionPriceAsOf: sql`excluded.institution_price_as_of`,
          institutionPriceDatetime: sql`excluded.institution_price_datetime`,
          isoCurrencyCode: sql`excluded.iso_currency_code`,
          updatedAt: timestamp ? timestamp : sql`CURRENT_TIMESTAMP`,
        },
      })
      .returning();
    return { holdingUpserts };
  } catch (error) {
    return logErrorAndThrow(error);
  }
};

const getAllHoldingValues = (
  holdingsPlaid: HoldingPlaid[],
  holdingMap: Map<string, { holdingId: string }>
) => {
  const values = holdingsPlaid.map((holdingPlaid) => {
    const accountId = valueOrDefault(holdingPlaid.account_id, "");
    const securityId = valueOrDefault(holdingPlaid.security_id, "");
    const holdingId = holdingMap.get(`${accountId}-${securityId}`)?.holdingId || "";

    return {
      holdingId,
      accountId,
      securityId,
      costBasis: `${valueOrDefault(holdingPlaid.cost_basis, 0)}`,
      institutionPrice: `${valueOrDefault(holdingPlaid.institution_price, 0)}`,
      institutionValue: `${valueOrDefault(holdingPlaid.institution_value, 0)}`,
      quantity: `${valueOrDefault(holdingPlaid.quantity, 0)}`,
      vestedQuantity: `${valueOrDefault(holdingPlaid.vested_quantity, 0)}`,
      vestedValue: `${valueOrDefault(holdingPlaid.vested_value, 0)}`,
      institutionPriceAsOf: valueOrDefault(
        isoToUTC(holdingPlaid.institution_price_as_of).toISOString(),
        null
      ),
      institutionPriceDatetime: valueOrDefault(
        isoToUTC(holdingPlaid.institution_price_datetime).toISOString(),
        null
      ),
      isoCurrencyCode: holdingPlaid.iso_currency_code || null,
    };
  });

  return values;
};
