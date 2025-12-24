import prisma from "@/lib/prisma";

interface HouseholdAccessCheck {
  member_id: string;
  user_id: string;
}

/**
 * Checks if a user can edit/modify the household of the given member.
 *
 * Returns `true` **only** if:
 * - The user belongs to a household
 * - The member belongs to a household
 * - Both belong to **exactly the same** household
 *
 * @remarks
 * Assumes a user typically belongs to one household (uses first match).
 * If users can belong to multiple households, consider adding role-based checks.
 */
export const canUserEditMembersHousehold = async ({
  user_id,
  member_id,
}: HouseholdAccessCheck): Promise<boolean> => {
  const membership = await prisma.householdMember.findFirst({
    where: {
      user_id,
      household: {
        members: {
          some: { member_id },
        },
      },
    },
    select: { role: true },
  });

  return membership?.role === "ADMIN";
};
