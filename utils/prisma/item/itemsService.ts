import prisma from "@/lib/prisma";

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

/**
 * Retrieves items grouped by account type for a specific user.
 *
 * This function queries the database to fetch all items associated with the given user ID.
 * Each item includes its related accounts. The result is returned as an array of items.
 *
 * @param userId - The unique identifier of the user whose items are to be retrieved.
 * @returns A promise that resolves to an array of items, each including its associated accounts.
 *
 * @example
 * ```typescript
 * const items = await getItemsGroupedByAccountType("user123");
 * console.log(items);
 * ```
 */
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
