import prisma from "@/lib/prisma";

/**
 *
 * Checks if the item already exists in the database.
 *
 */
export const getItem = async (item_id: string) => {
  const item = await prisma.item.findUnique({
    where: {
      item_id,
    },
  });
  return item;
};

/**
 * Retrieves items associated with a specific user and institution from the database.
 *
 * @param user_id - The unique identifier of the user.
 * @param institution_id - The unique identifier of the institution.
 * @returns A promise that resolves to an array of items, each including their associated accounts.
 */
export const getItemsByUserAndInstitutionId = async (
  user_id: string,
  institution_id: string
) => {
  const currentItems = await prisma.item.findMany({
    where: {
      user_id,
      institution_id,
    },
    include: {
      accounts: true,
    },
  });

  return currentItems;
};
