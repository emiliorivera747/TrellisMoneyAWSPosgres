import {prisma} from "@/lib/prisma";

export const getItemsWithId = async (userId: string) => {
  const items = await prisma.item.findMany({
    where: {
      user_id: userId,
    },
  });
  return items;
}