import { NextResponse, NextRequest} from "next/server";
import {
  Configuration,
  PlaidApi,
  PlaidEnvironments,
  Products,
  CountryCode,
} from "plaid";

import { AuthGetRequest } from "plaid";
const config = new Configuration({
  basePath:
    PlaidEnvironments[process.env.PLAID_ENV as keyof typeof PlaidEnvironments],
  baseOptions: {
    headers: {
      "PLAID-CLIENT-ID": process.env.PLAID_CLIENT_ID || "",
      "PLAID-SECRET": process.env.PLAID_SECRET || "",
    },
  },
});
const client = new PlaidApi(config);
export async function POST(req: NextRequest) {
  const { access_token } = await req.json();

  const request: AuthGetRequest = {
    access_token: access_token,
  };

  try {
    console.log("Acess Token ", access_token);
    const response = await client.authGet(request);
    console.log("Response Data ", response.data);
    const accountData = response.data.accounts;
    console.log("Account Data ", accountData);
    const numbers = response.data.numbers;
    console.log("Numbers ", numbers);
    return NextResponse.json({ accountData, numbers }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Error fetching account data" },
      { status: 500 }
    );
  }
}
