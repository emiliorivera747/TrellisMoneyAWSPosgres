import { db } from "@/drizzle/db";
import { eq, and, desc } from "drizzle-orm";
import { item, account } from "@/drizzle/schema";

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
