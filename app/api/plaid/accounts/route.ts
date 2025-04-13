import { NextResponse, NextRequest } from "next/server";
import { AccountsGetRequest } from "plaid";
import { prisma } from "@/lib/prisma";
import { createClient } from "@/utils/supabase/server";

/**
 *
 * Fetch all of the users accounts from Plaid and 
 * store them in the database.
 *
 * @param req
 * @returns
 */
export async function GET(req: NextRequest) {
  try {
    const supabase = await createClient();

    const {
      data: { user },
    } = await supabase.auth.getUser();

    // Get all of the users Items
    const items = await prisma.user.findMany({
      where: {
        id: user?.id || "",
      },
      include: {
        items: true,
      },
    });

    console.log(items);


    
    // const request: AccountsGetRequest = {
    //   access_token: process.env.PLAID_ACCESS_TOKEN || "",
    // };

    // const accounts = await prisma.account.findMany({
    //   where: {
    //     user_id: user?.id || "",
    //   },
    // });
    const accounts = [];

    return NextResponse.json({ accounts }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Error fetching account balance data" },
      { status: 500 }
    );
  }
}
