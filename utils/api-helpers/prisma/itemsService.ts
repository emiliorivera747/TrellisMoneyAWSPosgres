import { prisma } from "@/lib/prisma";

/**
 *
 * Get all items for a user
 *
 * @param userId
 * @returns all items for a user
 */
export const getItemsById = async (userId: string) => {
  const items = await prisma.item.findMany({
    where: {
      user_id: userId,
    },
  });
  return items;
};

/**
 *
 * Get all items for a user
 *
 * @param userId
 * @returns all items for a user
 */
export const getItemsByUserId = async (userId: string) => {
  const items = await prisma.item.findMany({
    where: {
      user_id: userId,
    },
  });
  return items;
};

export const getItemsGroupedByAccountType = async (userId: string) => {
  const items = await prisma.item.findMany({
    where: {
      user_id: userId,
    },
    include: {
      accounts: true,
    },
  });

  return items;
};
