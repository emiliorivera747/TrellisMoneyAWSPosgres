import { prisma } from "@/lib/prisma";
/**
 *
 * Gets the user's holdings and securities from the database.
 *
 * @param userId
 * @returns
 */
export const getHoldingsAndSecurities = async (userId: string) => {
  const userHoldings = await prisma.user.findMany({
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

  return userHoldings[0].holdings;
};
