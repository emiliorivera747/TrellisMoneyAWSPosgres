import { db } from "@/drizzle/db";
import { holding } from "@/drizzle/schema";
import { Holding as HoldingPlaid } from "plaid";
import { valueOrDefault } from "@/utils/helper-functions/formatting/getValueOrDefaultValue";
import isoToUTC from "@/utils/api-helpers/dates/isoToUTC";
import { getServerErrorMessage } from "@/utils/api-helpers/errors/getServerErrorMessage";
import { sql } from "drizzle-orm";
import { Holding as HoldingDrizzle } from "@/drizzle/schema";
import { UpsertHoldingsParams } from "@/types/utils/drizzle/investments/getInvestments";

/**
 * Upserts the holdings into the database using Drizzle
 * Note: In Drizzle schema, holdings use householdMemberId instead of user_id
 */
export const upsertHoldings = async ({
  holdingsPlaid,
  timestamp,
  accountMap,
}: UpsertHoldingsParams): Promise<{
  holdingUpserts: HoldingDrizzle[];
}> => {
  try {
    if (holdingsPlaid.length === 0) {
      return { holdingUpserts: [] };
    }

    const values = holdingsPlaid.map((holdingPlaid) => {
      const accountId = valueOrDefault(holdingPlaid.account_id, "");
      const securityId = valueOrDefault(holdingPlaid.security_id, "");
      const holdingId = `${accountId}-${securityId}`;
      const { householdMemberId = "" } = accountMap.get(accountId) ?? {};

      return {
        holdingId,
        accountId,
        securityId,
        householdMemberId,
        costBasis: valueOrDefault(holdingPlaid.cost_basis, 0).toString(),
        institutionPrice: valueOrDefault(
          holdingPlaid.institution_price,
          0
        ).toString(),
        institutionValue: valueOrDefault(
          holdingPlaid.institution_value,
          0
        ).toString(),
        quantity: valueOrDefault(holdingPlaid.quantity, 0).toString(),
        vestedQuantity: valueOrDefault(
          holdingPlaid.vested_quantity,
          0
        ).toString(),
        vestedValue: valueOrDefault(holdingPlaid.vested_value, 0).toString(),
        institutionPriceAsOf: holdingPlaid.institution_price_as_of
          ? isoToUTC(holdingPlaid.institution_price_as_of).toISOString()
          : null,
        institutionPriceDatetime: holdingPlaid.institution_price_datetime
          ? isoToUTC(holdingPlaid.institution_price_datetime).toISOString()
          : null,
        isoCurrencyCode: holdingPlaid.iso_currency_code || null,
      };
    });

    const holdingUpserts = await db
      .insert(holding)
      .values(values)
      .onConflictDoUpdate({
        target: holding.holdingId,
        set: {
          householdMemberId: sql`excluded.household_member_id`,
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
          updatedAt: sql`CURRENT_TIMESTAMP`,
        },
      })
      .returning();

    return { holdingUpserts };
  } catch (error) {
    console.error("Error upserting holdings:", getServerErrorMessage(error));
    throw new Error(getServerErrorMessage(error));
  }
};
