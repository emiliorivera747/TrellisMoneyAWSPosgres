import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { client } from "@/config/plaidClient";
import { getItem } from "@/utils/prisma/item/getItem";
import { withAuth } from "@/lib/protected";

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ _id: string }> }) {
  return withAuth(req, async (request, user) => {
    try {
      // Item id
      const { _id } = await params;

      // Get the item
      const itemFound = await getItem(_id);

      const access_token = itemFound?.access_token;

      // If the item exists, remove it from Plaid
      if (itemFound && access_token) {
        // Delete the item from the database
        const deletedItem = await prisma.item.delete({
          where: {
            item_id: _id,
          },
        });

        if (!deletedItem) {
          return NextResponse.json(
            { message: "Failed to delete item from database" },
            { status: 400 }
          );
        }

        // Remove the item from Plaid
        const res = await client.itemRemove({ access_token: _id });
        if (res.status !== 200) {
          return NextResponse.json(
            { message: `Failed to remove item with status code ${res.status}` },
            { status: 400 }
          );
        }
      }

      return NextResponse.json(
        { message: `Successfully deleted item ${_id}` },
        { status: 200 }
      );
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Unknown error";
      console.log("Error Message: ", errorMessage);
      return NextResponse.json({ message: errorMessage }, { status: 500 });
    }
  });
}
