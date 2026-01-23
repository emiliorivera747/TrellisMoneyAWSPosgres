import { db } from "@/drizzle/db";
import { holding, Account, account, householdMember } from "@/drizzle/schema";
import { inArray, eq } from "drizzle-orm";

/**
 * Get holdings for specific accounts
 * PREFERRED: Use this when you already have accounts from items
 */
export const getHoldingsByAccounts = async (accounts: Account[]) => {
  if (accounts.length === 0) return [];
  const accountIds = accounts.map((acc) => acc.accountId);

  const holdings = await db
    .select()
    .from(holding)
    .where(inArray(holding.accountId, accountIds));

  return holdings;
};

/**
 * Get holdings for all accounts in a household
 * Joins holding -> account -> householdMember to filter by household ID
 */
export const getHoldingsWithHouseholdId = async (householdId: string) => {
  const holdings = await db
    .select({
      holdingId: holding.holdingId,
      accountId: holding.accountId,
      securityId: holding.securityId,
      institutionPrice: holding.institutionPrice,
      institutionPriceAsOf: holding.institutionPriceAsOf,
      institutionPriceDatetime: holding.institutionPriceDatetime,
      institutionValue: holding.institutionValue,
      costBasis: holding.costBasis,
      quantity: holding.quantity,
      isoCurrencyCode: holding.isoCurrencyCode,
      vestedQuantity: holding.vestedQuantity,
      vestedValue: holding.vestedValue,
      expectedAnnualReturnRate: holding.expectedAnnualReturnRate,
      createdAt: holding.createdAt,
      updatedAt: holding.updatedAt,
    })
    .from(holding)
    .innerJoin(account, eq(holding.accountId, account.accountId))
    .innerJoin(
      householdMember,
      eq(account.householdMemberId, householdMember.householdMemberId)
    )
    .where(eq(householdMember.householdId, householdId));

  return holdings;
};
