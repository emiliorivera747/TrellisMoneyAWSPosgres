import prisma from "@/lib/prisma";

interface AddItemProps {
  user_id: string;
  member_id: string;
  item_id: string;
  access_token: string;
  household_id: string;
  request_id: string;
}

/**
 * Adds the item to the database.
 *
 * @param user_id - The ID of the authenticated user
 * @param item - The item details retrieved from Plaid
 * @param access_token - The access token associated with the item
 * @returns The created item record or an error
 */
export const addItem = async ({
  user_id,
  member_id,
  household_id,
  item_id,
  access_token,
  request_id,
}: AddItemProps) => {
  const res = await prisma.item.create({
    data: {
      item_id,
      user: { connect: { user_id } },
      member: { connect: { member_id } },
      household: { connect: { household_id } },
      request_id,
      access_token,
    },
  });

  return res;
};
