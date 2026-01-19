import { db } from "@/drizzle/db";
import { eq, and, inArray } from "drizzle-orm";
import { household, householdMember, user } from "@/drizzle/schema";

// types
import { HasHouseholdPermission } from "@/types/utils/drizzle/household-member/members";

/**
 * Retrieves the household ID for a member_id.
 *
 * @param memberId - The unique identifier of the member.
 * @returns A promise that resolves to the household_id if found, or `null` otherwise.
 */
export const getHouseholdIdByMembership = async (
  memberId: string
): Promise<string | null> => {
  const member = await db
    .select({ householdId: householdMember.householdId })
    .from(householdMember)
    .where(eq(householdMember.householdMemberId, memberId))
    .limit(1);
  if (!member[0]?.householdId) return null;
  return member[0].householdId;
};

/**
 * Verifies if a user has permission in a household.
 *
 * @param params - Contains user_id, household_id, and optional allowed_roles.
 * @returns `true` if authorized, otherwise `false`.
 */
export const hasHouseholdPermission = async ({
  userId,
  householdId,
  allowedRoles: allowed_roles = ["ADMIN", "MEMBER"],
}: HasHouseholdPermission): Promise<boolean> => {
  const member = await db
    .select({ role: householdMember.role })
    .from(householdMember)
    .where(
      and(
        eq(householdMember.householdId, householdId),
        eq(householdMember.userId, userId)
      )
    )
    .limit(1);

  if (!member[0]) return false;

  return allowed_roles.includes(member[0].role);
};

export const getMembers = async (userId: string) => {
  const memberRows = await db
    .select({
      householdMemberId: householdMember.householdMemberId,
    })
    .from(householdMember)
    .leftJoin(user, eq(householdMember.userId, user.userId))
    .leftJoin(household, eq(householdMember.householdId, household.householdId))
    .where(
      inArray(
        householdMember.householdId,
        db
          .select({ householdId: householdMember.householdId })
          .from(householdMember)
          .where(eq(householdMember.userId, userId))
      )
    )
    .orderBy(
      householdMember.householdId,
      householdMember.role,
      household.householdName
    );
  return memberRows;
};
