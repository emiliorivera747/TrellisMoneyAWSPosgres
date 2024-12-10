import { NextResponse, NextRequest } from "next/server";
import { InvestmentsHoldingsGetRequest } from "plaid";
import { plaidClient } from "@/config/plaidClient";

export async function GET(req: NextRequest) {
  // const { access_token } = await req.json();
  const access_token = "access-sandbox-fa4c5ca6-d883-4191-a7b2-d2c3b2e8143a";

  const request: InvestmentsHoldingsGetRequest = {
    access_token: access_token,
  };

  try {
    console.log("Access Token ", access_token);

    const response = await plaidClient.investmentsHoldingsGet(request);
    console.log("Response Data ", response.data);
    console.log("Response Data ", response.data);
    const holdings = response.data.holdings;
    const securities = response.data.securities;
    console.log("Holdings Data ", holdings);
    console.log("Securities Data ", securities);
    return NextResponse.json({ holdings, securities }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Error fetching investment holdings data" },
      { status: 500 }
    );
  }
}
