import { db } from "@/drizzle/db";
import { eq, and, desc, inArray } from "drizzle-orm";
import { item, account, householdMember, household } from "@/drizzle/schema";

type GetItemWithMemberAndInstitutionId = {
  memberId: string;
  institutionId: string;
};

/**
 * Retrieves the first item from the database that matches the specified member ID and institution ID.
 *
 * @param member_id - The unique identifier of the member.
 * @param institution_id - The unique identifier of the institution.
 * @returns A promise that resolves to the item if found, or `null` if no matching item exists.
 */
export const getItemWithMemberAndInstitutionId = async ({
  memberId,
  institutionId,
}: GetItemWithMemberAndInstitutionId) => {
  const items = await db
    .select()
    .from(item)
    .innerJoin(account, eq(account.itemId, item.itemId))
    .where(
      and(
        eq(account.householdMemberId, memberId),
        eq(item.institutionId, institutionId)
      )
    )
    .orderBy(desc(item.createdAt))
    .limit(1);
  return items[0] ?? null;
};

export const getItemsWithUserId = async (userId: string) => {
  const items = await db.select().from(item).where(eq(item.userId, userId));
  return items;
};

export const getItemsByHouseholdMemberIds = async (
  householdMemberIds: string[]
) => {
  const items = await db
    .selectDistinct({
      itemId: item.itemId,
      accessToken: item.accessToken,
      institutionId: item.institutionId,
      institutionName: item.institutionName,
      errorCode: item.errorCode,
    })
    .from(item)
    .innerJoin(account, eq(account.itemId, item.itemId))
    .where(inArray(account.householdMemberId, householdMemberIds));

  return items;
};

/**
 * Retrieves an item along with its associated household and household members filtered by a specific user ID.
 * 
 * In the Drizzle schema, items are linked to users directly, and households are accessed through accounts.
 * This function:
 * 1. Gets the item by item_id
 * 2. Gets accounts for that item
 * 3. Gets household members for those accounts (filtered by user_id)
 * 4. Gets household info from those members
 * 
 * @param itemId - The ID of the item to retrieve
 * @param userId - The ID of the user to filter household members
 * @returns A promise that resolves to the item with household and members info, or null if not found
 */
export const getItemWithHousehold = async ({
  item_id,
  user_id,
}: {
  item_id: string;
  user_id: string;
}) => {
  // Get the item
  const itemResult = await db
    .select()
    .from(item)
    .where(eq(item.itemId, item_id))
    .limit(1);

  if (itemResult.length === 0) return null;

  const itemData = itemResult[0];

  // Get accounts for this item
  const accounts = await db
    .select()
    .from(account)
    .where(eq(account.itemId, item_id));

  if (accounts.length === 0) {
    // Return item without household if no accounts
    return {
      ...itemData,
      household: null,
    };
  }

  // Get household member IDs from accounts
  const householdMemberIds = accounts.map((acc) => acc.householdMemberId);

  // Get household members filtered by user_id
  const members = await db
    .select()
    .from(householdMember)
    .where(
      and(
        inArray(householdMember.householdMemberId, householdMemberIds),
        eq(householdMember.userId, user_id)
      )
    );

  if (members.length === 0) {
    return {
      ...itemData,
      household: null,
    };
  }

  // Get household info from the first member (they should all be in the same household)
  const householdId = members[0].householdId;
  const householdResult = await db
    .select()
    .from(household)
    .where(eq(household.householdId, householdId))
    .limit(1);

  const householdData = householdResult[0] || null;

  return {
    ...itemData,
    household: householdData
      ? {
          ...householdData,
          members,
        }
      : null,
  };
};
