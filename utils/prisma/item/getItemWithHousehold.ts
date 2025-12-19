import prisma from "@/lib/prisma";

/**
 * Retrieves an item along with its associated household and household members filtered by a specific user ID.
 *
 * @param {Object} params - The parameters for the query.
 * @param {string} params.user_id - The ID of the user to filter household members.
 * @param {string} params.item_id - The ID of the item to retrieve.
 * @returns {Promise<any>} A promise that resolves to the item with its associated household and filtered members, or `null` if the item is not found.
 */
const getItemWithHousehold = async ({
  user_id,
  item_id,
}: {
  user_id: string;
  item_id: string;
}) => {
  const item = await prisma.item.findUnique({
    where: {
      item_id,
    },
    include: {
      household: {
        include: {
          members: {
            where: { user_id },
          },
        },
      },
    },
  });
  return item;
};

export default getItemWithHousehold;
