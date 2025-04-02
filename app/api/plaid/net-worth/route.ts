import { NextResponse, NextRequest } from "next/server";
import { AccountsGetRequest } from "plaid";
import { plaidClient } from "@/config/plaidClient";
import { prisma } from "@/lib/prisma";
import { calculateNetWorth } from "@/utils/api-helpers/calculateNetWorth";
import { createClient } from "@/utils/supabase/server";

export async function GET(req: NextRequest) {

    const request: AccountsGetRequest = {
        access_token: process.env.PLAID_ACCESS_TOKEN || "",
    };

    try {
        const supabase = await createClient();
        const {
          data: { user },
        } = await supabase.auth.getUser();
      
        // const response = await plaidClient.accountsBalanceGet(request);
        const accounts = await 
            prisma.account.findMany({
                where: {
                    user_id: user?.id || "",
                }
            });
        const netWorth = calculateNetWorth(accounts);
        console.log("NET WORTH: ", netWorth);
        return NextResponse.json({net_worth: netWorth}, { status: 200 });
    } catch (error) {
        return NextResponse.json(
            { error: "Error fetching account balance data" },
            { status: 500 }
        );
    }
}