import prisma from "@/lib/prisma";
import { Prisma } from "@/app/generated/prisma/browser";

/**
 * Fetches items from households where the user is a member.
 *
 * @param user_id - User's unique ID.
 * @returns Promise resolving to an array of household items.
 *
 * @example
 * const items = await getHouseholdMembersByUserId("12345");
 * console.log(items);
 */
export const getMemberByUserId = async <
  T extends Prisma.HouseholdMemberInclude
>(
  user_id: string,
  householdInclude?: T
): Promise<Prisma.HouseholdMemberGetPayload<{ include: T }> | null> => {
  const defaultInclude: Prisma.HouseholdMemberInclude = {
    household: {
      include: { accounts: true, items: true },
    },
  };

  const include = householdInclude
    ? { household: { include: householdInclude } }
    : defaultInclude;

  const member = await prisma.householdMember.findUnique({
    where: { user_id },
    include: include as T,
  });

  if (!member) return null;
  return member as Prisma.HouseholdMemberGetPayload<{ include: T }>;
};

export const getMemberWithHouseholdByUserId = async <
  T extends Prisma.HouseholdInclude
>({
  user_id,
  householdInclude,
}: {
  user_id: string;
  householdInclude?: T;
}): Promise<Prisma.HouseholdMemberGetPayload<{
  include: { household: { include: T } };
}> | null> => {

  const defaultInclude: Prisma.HouseholdInclude = {
    accounts: true,
    items: true,
  };

  const include = householdInclude || defaultInclude;

  const member = await prisma.householdMember.findUnique({
    where: { user_id },
    include: { household: { include } },
  });

  if (!member) return null;
  return member as Prisma.HouseholdMemberGetPayload<{
    include: { household: { include: T } };
  }>;
};
