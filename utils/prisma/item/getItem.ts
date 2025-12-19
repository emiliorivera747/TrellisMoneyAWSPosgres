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
