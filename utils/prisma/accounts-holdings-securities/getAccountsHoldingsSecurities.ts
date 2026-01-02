import prisma from "@/lib/prisma";

/**
 * Retrieves the accounts, holdings, and securities associated with a given household ID.
 *
 * @param household_id - The unique identifier of the household.
 * @returns A promise that resolves to an array containing the household object with its associated
 *          accounts, holdings, and securities, or an empty array if the household is not found.
 */
export const getAccountsExapanded = async (household_id: string) => {
  const household = await prisma.household.findUnique({
    where: { household_id },
    select: {
      accounts: {
        include: {
          holdings: {
            include: {
              security: true,
            },
          },
        },
      },
    },
  });
  return household ? [household] : [];
};
