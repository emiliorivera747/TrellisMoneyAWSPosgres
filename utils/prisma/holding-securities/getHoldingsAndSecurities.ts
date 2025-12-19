import prisma from "@/lib/prisma";

/**
 *
 * Gets the user's holdings and securities from the database.
 * Optimized to use findUnique instead of findMany for single user lookup
 *
 * @param userId
 * @returns
 */
export const getHoldingsAndSecurities = async (userId: string) => {
  const userHoldings = await prisma.user.findUnique({
    where: {
      user_id: userId,
    },
    select: {
      holdings: {
        include: {
          security: true,
        },
      },
    },
  });

  return userHoldings?.holdings ?? [];
};
