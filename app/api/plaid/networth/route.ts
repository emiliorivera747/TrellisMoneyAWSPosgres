import { NextResponse, NextRequest } from "next/server";
import { AccountsGetRequest } from "plaid";
import { plaidClient } from "@/config/plaidClient";
import { calculateNetWorth } from "@/utils/api-helpers/calculateNetWorth";

export async function GET(req: NextRequest) {
    const access_token = "access-sandbox-a78fa877-fd31-42d3-98a0-e022dfbf1c14";

    const request: AccountsGetRequest = {
        access_token: access_token,
    };

    try {
        const response = await plaidClient.accountsBalanceGet(request);
        const accounts = response.data.accounts;

        const netWorth = calculateNetWorth(accounts);

        return NextResponse.json({netWorth: netWorth}, { status: 200 });
    } catch (error) {
        console.log(error);
        return NextResponse.json(
            { error: "Error fetching account balance data" },
            { status: 500 }
        );
    }
}