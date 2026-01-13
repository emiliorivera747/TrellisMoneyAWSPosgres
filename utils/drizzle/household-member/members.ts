import { db } from "@/drizzle/db";
import { eq, and } from "drizzle-orm";
import { householdMember, householdRole } from "@/drizzle/schema";

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
    .where(eq(householdMember.memberId, memberId))
    .limit(1);

  if (!member[0]?.householdId) return null;
  return member[0].householdId;
};

type hasHouseholdPermission = {
  userId: string;
  householdId: string;
  allowedRoles?: (typeof householdRole.enumValues)[number][];
};

/**
 * Verifies if a user has permission in a household.
 *
 * @param params - Contains user_id, household_id, and optional allowed_roles.
 * @returns `true` if authorized, otherwise `false`.
 */
export const hasHouseholdPermission = async ({
  userId: user_id,
  householdId: household_id,
  allowedRoles: allowed_roles = ["ADMIN", "MEMBER"],
}: hasHouseholdPermission): Promise<boolean> => {
  const member = await db
    .select({ role: householdMember.role })
    .from(householdMember)
    .where(
      and(
        eq(householdMember.householdId, household_id),
        eq(householdMember.userId, user_id)
      )
    )
    .limit(1);

  if (!member[0]) return false;

  return allowed_roles.includes(member[0].role);
};
