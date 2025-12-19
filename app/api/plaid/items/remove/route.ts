import { NextRequest, NextResponse } from "next/server";
import { withAuth } from "@/lib/protected";
import prisma from "@/lib/prisma";
import { removeItemFromPlaid } from "@/services/plaid/items/items";

export async function POST(req: NextRequest) {
  return withAuth(req, async (request, user) => {
    try {
      const { item_id } = await req.json();
      const user_id = user.id;

      /**
       * Get the item with all of its populated objects
       */
      const item = await getItemWithHousehold({ item_id, user_id });

      /**
       *  If item not found return 404 error
       */
      if (!item)
        return NextResponse.json(
          { error: "Item not found or you do not have access to it." },
          { status: 404 }
        );

      const currentMember = item.household.members[0];

      /**
       * Is the current user the owner of the item?
       */
      if (item.user_id === user_id || (currentMember && currentMember.role === 'ADMIN')) {
        try {
          
          await removeItemFromPlaid(item.access_token);

          await prisma.item.delete({
            where: {
              item_id,
            },
          });

          return NextResponse.json({ message: "Item successfully removed." });
        } catch (error) {
          return NextResponse.json(
            { error: "Plaid removal failed. Nothing deleted from database." },
            { status: 500 }
          );
        }
      } else {
        return NextResponse.json(
          { error: "You do not have permission to remove this item." },
          { status: 403 }
        );
      }
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Unknown error";
      return NextResponse.json({ error: errorMessage }, { status: 500 });
    }
  });
}

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
