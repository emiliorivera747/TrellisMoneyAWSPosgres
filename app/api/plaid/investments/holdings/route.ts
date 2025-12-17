import { NextResponse, NextRequest } from "next/server";
import { getUser } from "@/services/supabase/getUser";
import { getItemsByUserId } from "@/utils/prisma/item/itemsService";
import { noItemsError } from "@/utils/api-helpers/errors/itemErrors";
import { getInvestments } from "@/utils/prisma/investments/getInvestments";
import { validateTimestamp } from "@/utils/api-helpers/projected-net-worth/validateTimestamp";

/**
 *
 * @param req
 * @returns
 */
export async function GET(req: NextRequest) {
  try { 
    
    /**
     *  Timestamp
     */
    const { searchParams } = new URL(req.url);
    const timestamp = searchParams.get("timestamp");
    validateTimestamp(timestamp);

    const user = await getUser();

    /**
     *  Get the items for the user
     */
    const items = await getItemsByUserId(user?.id || "");
    noItemsError(items);

    const investments = await getInvestments(items, timestamp || "");

    return NextResponse.json({ data: investments }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Error fetching investment holdings data" },
      { status: 500 }
    );
  }
}
