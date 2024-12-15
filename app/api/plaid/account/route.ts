import { NextResponse, NextRequest} from "next/server";
import { AuthGetRequest } from "plaid";
import { plaidClient } from "@/config/plaidClient";

export async function GET(req: NextRequest) {
  const { access_token } = await req.json();

  const request: AuthGetRequest = {
    access_token: access_token,
  };

  try {
    const response = await plaidClient.authGet(request);
    const accountData = response.data.accounts;
    const numbers = response.data.numbers;
    return NextResponse.json({ accountData, numbers }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Error fetching account data" },
      { status: 500 }
    );
  }
}
