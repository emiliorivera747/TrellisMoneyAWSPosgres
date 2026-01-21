import { db } from "@/drizzle/db";
import { eq, inArray } from "drizzle-orm";
import { householdMember, household, item, account, holding } from "@/drizzle/schema";

/**
 * Fetches household member by user ID with household relations (accounts and items).
 *
 * @param userId - User's unique ID.
 * @returns Promise resolving to household member with household, accounts, and items, or null if not found.
 *
 * @example
 * const member = await getMemberByUserId("12345");
 * console.log(member?.household?.accounts);
 */
export const getMemberByUserId = async (userId: string) => {
  const member = await db.query.householdMember.findFirst({
    where: eq(householdMember.userId, userId),
  });
  return member;
};

export const getHouseholdByHouseholdId = async (householdId: string) => {

  const householdData = await db.query.household.findFirst({
    where: eq(household.householdId, householdId),
    with: { householdMembers: true },
  });

  return householdData;
};

/**
 * Fetches household member by user ID with full household relations.
 *
 * @param userId - User's unique ID.
 * @returns Promise resolving to household member with household, accounts, items, and holdings, or null if not found.
 *
 * @example
 * const member = await getMemberWithHouseholdByUserId("12345");
 * console.log(member?.household?.accounts);
 */
export const getMemberWithHouseholdByUserId = async (userId: string) => {
  // First get the member with their household ID
  const member = await db.query.householdMember.findFirst({
    where: eq(householdMember.userId, userId),
  });

  if (!member?.householdId) return null;

  // Get all household members for this household
  const members = await db
    .select({ householdMemberId: householdMember.householdMemberId })
    .from(householdMember)
    .where(eq(householdMember.householdId, member.householdId));

  const memberIds = members.map((m) => m.householdMemberId);

  if (memberIds.length === 0) return null;

  // Get items, accounts, and holdings for all household members
  const [items, accounts, holdings] = await Promise.all([
    db.select().from(item).where(eq(item.userId, userId)),
    db
      .select()
      .from(account)
      .where(inArray(account.householdMemberId, memberIds)),
    db
      .select()
      .from(holding)
      .where(
        inArray(
          holding.accountId,
          db.select({ accountId: account.accountId }).from(account).where(inArray(account.householdMemberId, memberIds))
        )
      ),
  ]);

  return {
    ...member,
    household_id: member.householdId,
    household: {
      household_id: member.householdId,
      items,
      accounts,
      holdings,
    },
  };
};

/**
 * Fetches accounts with expanded holdings and securities for a household.
 *
 * @param householdId - The unique identifier of the household.
 * @returns Promise resolving to accounts array with holdings and securities, or null if not found.
 *
 * @example
 * const data = await getExpandedAccounts("household-123");
 * console.log(data?.accounts);
 */
export const getExpandedAccounts = async (householdId: string) => {
  // Get all household members
  const members = await db
    .select({ householdMemberId: householdMember.householdMemberId })
    .from(householdMember)
    .where(eq(householdMember.householdId, householdId));

  const memberIds = members.map((m) => m.householdMemberId);

  if (memberIds.length === 0) return null;

  // Get accounts with holdings and securities
  const accounts = await db.query.account.findMany({
    where: inArray(account.householdMemberId, memberIds),
    with: {
      holdings: {
        with: {
          security: true,
        },
      },
    },
  });

  return { accounts };
};
