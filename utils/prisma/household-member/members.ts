import prisma from "@/lib/prisma";
import { HouseholdRole } from "@/app/generated/prisma/enums";

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
 * Securely retrieves the household ID for a member_id, but ONLY if it belongs to the given user_id.
 *
 * Returns household_id only if:
 * - The member_id exists
 * - It is linked to the provided user_id
 *
 * Returns null otherwise.
 */
export const getHouseholdIdByMembership = async (
  member_id: string
): Promise<string | null> => {
  
  const member = await prisma.householdMember.findUnique({
    where: { member_id },
    select: { household_id: true },
  });

  if (!member?.household_id) return null;

  return member.household_id;
};

/**
 * Checks if a user is authorized within a specific household.
 *
 * This function verifies if the user with the given `user_id` is a member
 * of the household identified by `household_id` and has a role of either
 * "ADMIN" or "MEMBER". If the user is not found or does not have one of
 * these roles, the function returns `false`.
 *
 * @param {Object} params - The parameters for the authorization check.
 * @param {string} params.user_id - The unique identifier of the user.
 * @param {string} params.household_id - The unique identifier of the household.
 * @returns {Promise<boolean>} - A promise that resolves to `true` if the user
 * is authorized, or `false` otherwise.
 *
 * @throws {Error} - If there is an issue with the database query.
 */
export const hasHouseholdPermission = async ({
  user_id,
  household_id,
  allowed_roles = ["ADMIN", "MEMBER"],
}: {
  user_id: string;
  household_id: string;
  allowed_roles?: HouseholdRole[];
}) => {
  const member = await prisma.householdMember.findUnique({
    where: {
      household_id_user_id: {
        household_id,
        user_id,
      },
    },
    select: { role: true },
  });

  return !!member && allowed_roles.includes(member.role);
};
