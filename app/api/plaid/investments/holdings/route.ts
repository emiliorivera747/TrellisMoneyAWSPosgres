import { NextResponse, NextRequest } from "next/server";
import { InvestmentsHoldingsGetRequest } from "plaid";
import { plaidClient } from "@/config/plaidClient";

export async function GET(req: NextRequest) {

  const request: InvestmentsHoldingsGetRequest = {
    access_token: process.env.PLAID_ACCESS_TOKEN || "",
  };

  try {
    const response = await plaidClient.investmentsHoldingsGet(request);
    const holdings = response.data.holdings;
    const securities = response.data.securities;
    return NextResponse.json({ holdings, securities }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Error fetching investment holdings data" },
      { status: 500 }
    );
  }
}
