import prisma from "@/lib/prisma";

/**
 * Retrieves household members' items associated with a specific user ID.
 *
 * @param user_id - The unique identifier of the user whose household members' items are to be retrieved.
 * @returns A promise that resolves to an array of items belonging to the households
 *          where the user is a member.
 *
 * @remarks
 * This function queries the database to find all households where the specified user
 * is a member. It then retrieves and flattens the items associated with those households.
 *
 * @example
 * ```typescript
 * const userId = "12345";
 * const items = await getHouseholdMembersByUserId(userId);
 * console.log(items);
 * ```
 */
export const getMemberByUserId = async (
  user_id: string,
  householdInclude?: { accounts?: boolean; items?: boolean; holding: true }
) => {
  const defaultInclude = {
    household: {
      include: { accounts: true, items: true, holding: true },
    },
  };

  const include = householdInclude
    ? { household: { include: householdInclude } }
    : defaultInclude;

  const member = await prisma.householdMember.findUnique({
    where: { user_id },
    include,
  });

  if (!member) return null;
  return member;
};
