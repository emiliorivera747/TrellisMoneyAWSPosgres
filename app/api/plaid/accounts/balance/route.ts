import { NextResponse, NextRequest } from "next/server";
import { AccountsGetRequest } from "plaid";
import { plaidClient } from "@/config/plaidClient";


export async function GET(req: NextRequest) {
  const access_token = "access-sandbox-a78fa877-fd31-42d3-98a0-e022dfbf1c14";

  const request: AccountsGetRequest = {
    access_token: access_token,
  };

  try {
    // //("Access Token ", access_token);
    const response = await plaidClient.accountsBalanceGet(request);
    // //("Response Data ", response.data);
    const accounts = response.data.accounts;
    // //("Accounts Data ", accounts);
    return NextResponse.json({ accounts }, { status: 200 });
  } catch (error) {
    //(error);
    return NextResponse.json(
      { error: "Error fetching account balance data" },
      { status: 500 }
    );
  }
}
