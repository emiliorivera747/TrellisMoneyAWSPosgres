
import {ItemPrisma} from "@/types/prisma/prisma";
import { NextResponse } from "next/server";

/**
 * Checks whether the item is empty or not.
 *
 * @param item
 * @returns
 */
export const noItemsError = (item: ItemPrisma[]) => {
  if (!item || item.length === 0)
    return NextResponse.json({ message: "No items found" }, { status: 404 });
};
