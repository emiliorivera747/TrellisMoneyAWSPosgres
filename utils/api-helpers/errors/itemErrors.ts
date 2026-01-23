import { NextResponse } from "next/server";
import { Item } from "@/drizzle/schema";

/**
 * Checks whether the item is empty or not.
 *
 * @param item
 * @returns
 */
export const noItemsError = (item: Item[]) => {
  if (!item || item.length === 0)
    return NextResponse.json({ message: "No items found" }, { status: 404 });
};
