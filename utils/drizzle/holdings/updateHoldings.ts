// Helpers
import { ErrorResponse } from "@/utils/api-helpers/api-responses/response";

// Drizzle
import { db } from "@/drizzle/db";
import { holding, Account } from "@/drizzle/schema";
import { sql } from "drizzle-orm";

// Utils
import { valueOrDefault } from "@/utils/helper-functions/formatting/getValueOrDefaultValue";
import { generateAccountMap } from "@/utils/api-helpers/accounts/accountMaps";

// Types
import { Holding as HoldingPlaid, InvestmentsHoldingsGetResponse } from "plaid";

/**
 * Update the holdings in the database
 * Optimized to use batch operations via transaction to reduce database round-trips
 */
export async function updateHoldings(
  holdingsPlaidResponses: InvestmentsHoldingsGetResponse[],
  accountsDb: Account[]
) {
  // Flatten all holdings from all Plaid responses
  const plaidHoldings = holdingsPlaidResponses.flatMap(
    (response) => response.holdings || []
  );
  
  if (plaidHoldings.length === 0) return [];
  const accountMap = generateAccountMap(accountsDb);

  /**
   * Prepare all of the rows in one go
   */
  const values = plaidHoldings.map((plaidHolding) => {
    const accountId = plaidHolding.account_id;
    const securityId = plaidHolding.security_id;
    const { householdMemberId = "" } = accountMap.get(accountId) ?? {};

    // Generate holdingId from accountId and securityId
    const holdingId = `${accountId}-${securityId}`;

    return {
      holdingId,
      accountId,
      securityId,
      householdMemberId,
      institutionPrice: plaidHolding.institution_price
        ? valueOrDefault(plaidHolding.institution_price, 0).toString()
        : null,
      institutionPriceAsOf: plaidHolding.institution_price_as_of || null,
      institutionPriceDatetime: plaidHolding.institution_price_datetime || null,
      institutionValue: plaidHolding.institution_value
        ? valueOrDefault(plaidHolding.institution_value, 0).toString()
        : null,
      costBasis: plaidHolding.cost_basis
        ? valueOrDefault(plaidHolding.cost_basis, 0).toString()
        : null,
      quantity: plaidHolding.quantity
        ? valueOrDefault(plaidHolding.quantity, 0).toString()
        : null,
      isoCurrencyCode: plaidHolding.iso_currency_code || null,
      vestedQuantity: plaidHolding.vested_quantity
        ? valueOrDefault(plaidHolding.vested_quantity, 0).toString()
        : null,
      vestedValue: plaidHolding.vested_value
        ? valueOrDefault(plaidHolding.vested_value, 0).toString()
        : null,
    };
  });

  try {
    const updatedHoldings = await db
      .insert(holding)
      .values(values)
      .onConflictDoUpdate({
        target: holding.holdingId,
        set: {
          householdMemberId: sql`excluded.household_member_id`,
          accountId: sql`excluded.account_id`,
          securityId: sql`excluded.security_id`,
          institutionPrice: sql`excluded.institution_price`,
          institutionPriceAsOf: sql`excluded.institution_price_as_of`,
          institutionPriceDatetime: sql`excluded.institution_price_datetime`,
          institutionValue: sql`excluded.institution_value`,
          costBasis: sql`excluded.cost_basis`,
          quantity: sql`excluded.quantity`,
          isoCurrencyCode: sql`excluded.iso_currency_code`,
          vestedQuantity: sql`excluded.vested_quantity`,
          vestedValue: sql`excluded.vested_value`,
          expectedAnnualReturnRate: sql`excluded.expected_annual_return_rate`,
          updatedAt: sql`CURRENT_TIMESTAMP`,
        },
      })
      .returning();
    return updatedHoldings;
  } catch (error) {
    return ErrorResponse(error);
  }
}
