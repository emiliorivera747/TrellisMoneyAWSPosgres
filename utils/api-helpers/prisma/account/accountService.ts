import { ItemPrisma } from "@/types/prisma";
import {prisma} from "@/lib/prisma";

/**
 * Fetch all of the accounts associated with the user id
 * in the database.
 *
 * @param userId
 * @returns
 */
export const getAccountWithItemIds = async (items: ItemPrisma[]) => {
    const accounts = await prisma.account.findMany({
        where: {
            item_id: {
                in: items.map((item) => item.item_id),
            },
        },
    });

    return accounts;
};
