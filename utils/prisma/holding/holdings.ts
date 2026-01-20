import { db } from "@/drizzle/db";
import { holding, householdMember } from "@/drizzle/schema";
import { valueOrDefault } from "@/utils/helper-functions/formatting/getValueOrDefaultValue";
import isoToUTC from "@/utils/api-helpers/dates/isoToUTC";
import { Holding } from "@/types/services/plaid/plaid";
import { sql, eq, inArray } from "drizzle-orm";

// Types
import { UpdateOrCreateHoldingProps } from "@/types/api-routes/investments/getInvestments";

/**
 *
 * Will update or create a holding record in the database
 *
 * @param holding
 * @param timestamp
 */
export const updateOrCreateHolding = async ({
  holding: holdingPlaid,
  timestamp,
  userId,
  holdingsMap,
}: UpdateOrCreateHoldingProps) => {
  const accountId = valueOrDefault(holdingPlaid?.account_id, "");
  const securityId = valueOrDefault(holdingPlaid?.security_id, "");
  const holdingId = `${accountId}-${securityId}`;
  const householdMemberId = valueOrDefault(
    holdingsMap.get(`${holdingPlaid.account_id}-${holdingPlaid.security_id}`),
    ""
  );

  const holdingData = {
    holdingId,
    accountId,
    securityId,
    householdMemberId,
    costBasis: holdingPlaid?.cost_basis
      ? valueOrDefault(holdingPlaid.cost_basis, 0).toString()
      : null,
    institutionPrice: holdingPlaid?.institution_price
      ? valueOrDefault(holdingPlaid.institution_price, 0).toString()
      : null,
    institutionValue: holdingPlaid?.institution_value
      ? valueOrDefault(holdingPlaid.institution_value, 0).toString()
      : null,
    quantity: holdingPlaid?.quantity
      ? valueOrDefault(holdingPlaid.quantity, 0).toString()
      : null,
    vestedQuantity: holdingPlaid?.vested_quantity
      ? valueOrDefault(holdingPlaid.vested_quantity, 0).toString()
      : null,
    vestedValue: holdingPlaid?.vested_value
      ? valueOrDefault(holdingPlaid.vested_value, 0).toString()
      : null,
    institutionPriceAsOf: holdingPlaid?.institution_price_as_of
      ? isoToUTC(holdingPlaid.institution_price_as_of).toISOString()
      : null,
    institutionPriceDatetime: holdingPlaid?.institution_price_datetime
      ? isoToUTC(holdingPlaid.institution_price_datetime).toISOString()
      : null,
    isoCurrencyCode: valueOrDefault(holdingPlaid?.iso_currency_code, "") || null,
  };

  await db.insert(holding).values(holdingData)
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
    });
};

/**
 * Creates a new holding history record in the database
 *
 * @param holding
 * @param timestamp
 */
// export const createHoldingHistory = async (
//   holding: Holding,
//   timestamp: string,
//   user_id: string
// ) => {
//   await prisma.holdingHistory.create({
//     data: {
//       cost_basis: getValueOrDefault(holding?.cost_basis, 0),
//       institution_price: getValueOrDefault(holding?.institution_price, 0),
//       institution_value: getValueOrDefault(holding?.institution_value, 0),
//       quantity: getValueOrDefault(holding?.quantity, 0),
//       vested_quantity: getValueOrDefault(holding?.vested_quantity, 0),
//       vested_value: getValueOrDefault(holding?.vested_value, 0),
//       institution_price_as_of: isoToUTC(holding?.institution_price_as_of),
//       institution_price_datetime: isoToUTC(holding?.institution_price_datetime),
//       iso_currency_code: getValueOrDefault(holding?.iso_currency_code, ""),
//       unofficial_currency_code: getValueOrDefault(
//         holding?.unofficial_currency_code,
//         ""
//       ),
//       account_id: getValueOrDefault(holding?.account_id, ""),
//       security_id: getValueOrDefault(holding?.security_id, ""),
//       user_id: user_id,
//     },
//   });
// };

/**
 *
 * Returns all holdings for a user
 * Note: In Drizzle schema, holdings are linked via householdMember, not directly to user
 * This function gets holdings through household members
 *
 * @param user_id
 * @returns
 */
export const getAllHoldingsWithIds = async (user_id: string) => {
  // Get household member IDs for this user
  const members = await db
    .select({ householdMemberId: householdMember.householdMemberId })
    .from(householdMember)
    .where(eq(householdMember.userId, user_id));

  if (members.length === 0) return [];

  const memberIds = members.map((m) => m.householdMemberId);

  // Get holdings for these household members
  const userHoldings = await db
    .select()
    .from(holding)
    .where(inArray(holding.householdMemberId, memberIds));

  return userHoldings;
};

/**
 * Retrieves a list of holdings associated with a specific household ID.
 *
 * @param household_id - The unique identifier of the household whose holdings are to be retrieved.
 * @returns A promise that resolves to an array of holdings associated with the given household ID.
 */
export const getHoldingsWithHouseholdId = async (household_id: string) => {
  // Get household member IDs for this household
  const members = await db
    .select({ householdMemberId: householdMember.householdMemberId })
    .from(householdMember)
    .where(eq(householdMember.householdId, household_id));

  if (members.length === 0) return [];

  const memberIds = members.map((m) => m.householdMemberId);

  // Get holdings for these household members
  const holdings = await db
    .select()
    .from(holding)
    .where(inArray(holding.householdMemberId, memberIds));

  return holdings;
};
