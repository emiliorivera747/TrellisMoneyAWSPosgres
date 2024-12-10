import { NextResponse, NextRequest} from "next/server";
import { AuthGetRequest } from "plaid";
import { plaidClient } from "@/config/plaidClient";

export async function GET(req: NextRequest) {
  const { access_token } = await req.json();

  const request: AuthGetRequest = {
    access_token: access_token,
  };

  try {
    console.log("Acess Token ", access_token);
    const response = await plaidClient.authGet(request);
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
