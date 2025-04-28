import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { client } from "@/config/plaidClient";
import { getItem } from "@/utils/api-helpers/plaid/items/getItem";

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ _id: string }> }
) {
  try {
    // Item id
    const { _id } = await params;

    // Get the item
    const itemFound = await getItem(_id);

    const access_token = itemFound?.access_token;

    // If the item exists, remove it from Plaid
    if (itemFound && access_token)
      await client.itemRemove({ access_token: access_token });

    // Fetch the accounts associated with item_id
    const accounts = await prisma.account.findMany({
      where: {
        item_id: access_token,
      },
    });

    // Extract account IDs
    const accountIds = accounts.map((account) => account.account_id);

    // Delete all holdingsHistory
    await prisma.holdingHistory.deleteMany({
      where: {
        account_id: {
          in: accountIds,
        },
      },
    });

    // Delete all holding
    await prisma.holding.deleteMany({
      where: {
        account_id: {
          in: accountIds,
        },
      },
    });

    // Delete all accounts
    await prisma.account.deleteMany({
      where: {
        item_id: access_token,
      },
    });

    await prisma.item.delete({
      where: {
        item_id: _id,
      },
    });

    return NextResponse.json(
      { message: `Successfully deleted item ${_id}` },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ message: "Server Error" }, { status: 500 });
  }
}
