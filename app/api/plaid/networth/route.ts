import { NextResponse, NextRequest } from "next/server";
import { AccountsGetRequest } from "plaid";
import { plaidClient } from "@/config/plaidClient";
import { calculateNetWorth } from "@/utils/api-helpers/calculateNetWorth";

export async function GET(req: NextRequest) {

    const request: AccountsGetRequest = {
        access_token: process.env.PLAID_ACCESS_TOKEN || "",
    };

    try {
        const response = await plaidClient.accountsBalanceGet(request);
        const accounts = response.data.accounts;
        const netWorth = calculateNetWorth(accounts);

        return NextResponse.json({netWorth: netWorth}, { status: 200 });
    } catch (error) {
        return NextResponse.json(
            { error: "Error fetching account balance data" },
            { status: 500 }
        );
    }
}