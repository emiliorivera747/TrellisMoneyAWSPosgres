import { NextResponse, NextRequest } from "next/server";
import { IdentityGetRequest } from "plaid";
import { plaidClient } from "@/config/plaidClient";

export async function GET(req: NextRequest) {
  // const { access_token } = await req.json();
  const access_token = "access-sandbox-a78fa877-fd31-42d3-98a0-e022dfbf1c14";

  const request: IdentityGetRequest = {
    access_token: access_token,
  };

  try {
    // console.log("Access Token ", access_token);
    const response = await plaidClient.identityGet(request);
    // console.log("Response Data ", response.data);
    const identities = response.data.accounts.flatMap(
      (account) => account.owners
    );
    // console.log("Identities Data ", identities);
    return NextResponse.json({ identities }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Error fetching identity data" },
      { status: 500 }
    );
  }
}
