import { NextResponse, NextRequest } from "next/server";
import { getUser } from "@/utils/api-helpers/supabase/getUser";
import { getItemsByUserId } from "@/utils/api-helpers/prisma/itemsService";
import { noItemsError } from "@/utils/api-helpers/errors/itemErrors";
import { getInvestments } from "@/utils/api-helpers/plaid/investments/getInvestments";

export async function GET(req: NextRequest) {
  try {
    const user = await getUser();
    const items = await getItemsByUserId(user?.id || "");
    noItemsError(items);

    const investments = await getInvestments(items);

    console.log(investments);

    return NextResponse.json({ data: investments }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Error fetching investment holdings data" },
      { status: 500 }
    );
  }
}
