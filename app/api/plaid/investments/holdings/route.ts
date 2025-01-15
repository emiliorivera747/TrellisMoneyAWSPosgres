import { NextResponse, NextRequest } from "next/server";
import { InvestmentsHoldingsGetRequest } from "plaid";
import { plaidClient } from "@/config/plaidClient";

export async function GET(req: NextRequest) {
  // const { access_token } = await req.json();
  const access_token = "access-sandbox-a78fa877-fd31-42d3-98a0-e022dfbf1c14";

  const request: InvestmentsHoldingsGetRequest = {
    access_token: access_token,
  };

  try {
    //("Access Token ", access_token);

    const response = await plaidClient.investmentsHoldingsGet(request);
    // //("Response Data ", response.data);
    // //("Response Data ", response.data);
    const holdings = response.data.holdings;
    const securities = response.data.securities;
    // //("Holdings Data ", holdings);
    // //("Securities Data ", securities);
    return NextResponse.json({ holdings, securities }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Error fetching investment holdings data" },
      { status: 500 }
    );
  }
}
