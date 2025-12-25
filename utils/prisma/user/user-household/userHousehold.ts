import prisma from "@/lib/prisma";

interface HouseholdAccessCheck {
  household_id: string;
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
export const authorizeHouseholdAction = async ({
  user_id,
  household_id,
}: HouseholdAccessCheck): Promise<boolean> => {
  const membership = await prisma.householdMember.findUnique({
    where: {
      household_id_user_id: {
        household_id,
        user_id,
      },
    },
    select: { role: true },
  });
  return membership?.role === "ADMIN";
};
