import prisma from "@/lib/prisma";

/**
 * Retrieves the household membership information for a given user.
 *
 * @param user_id - The unique identifier of the user whose household membership is being retrieved.
 * @returns A promise that resolves to an object containing the `household_id` of the user's household membership,
 *          or `null` if no membership is found.
 *
 * @remarks
 * This function queries the `householdMember` table in the database to find the first record
 * that matches the provided `user_id`. The result includes only the `household_id` field.
 *
 * @example
 * ```typescript
 * const membership = await getUserHouseholdMembership("user123");
 * if (membership) {
 *   console.log(membership.household_id);
 * } else {
 *   console.log("No household membership found.");
 * }
 * ```
 */
export const getUserHouseholdMembership = async (user_id: string) => {
  const householdMembership = await prisma.householdMember.findFirst({
    where: {
      user_id,
    },
    select: {
      household_id: true,
    },
  });
  return householdMembership;
};

/**
 * Retrieves the household ID associated with a given member ID.
 *
 * @param member_id - The unique identifier of the household member.
 * @returns A promise that resolves to the household ID if found, or `null` if no matching record exists.
 */
export const getHouseholdIdByMembership = async (member_id: string) => {
  const householdMembership = await prisma.householdMember.findFirst({
    where: {
      member_id,
    },
    select: {
      household_id: true,
    },
  });

  return householdMembership?.household_id || null;
};
