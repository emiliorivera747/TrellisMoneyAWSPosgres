import { db } from "@/drizzle/db";
import { eq, and } from "drizzle-orm";
import { item } from "@/drizzle/schema";

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
}: {
  memberId: string;
  institutionId: string;
}) => {
  const items = await db
    .select()
    .from(item)
    .where(
      and(eq(item.memberId, memberId), eq(item.institutionId, institutionId))
    )
    .limit(1);

  return items[0] ?? null;
};
