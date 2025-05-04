import { NextResponse, NextRequest } from "next/server";
import { IdentityGetRequest } from "plaid";
import { plaidClient } from "@/config/plaidClient";

export async function GET(req: NextRequest) {
  const request: IdentityGetRequest = {
    access_token: process.env.PLAID_ACCESS_TOKEN || "",
  };

  try {
    const response = await plaidClient.identityGet(request);
    const identities = response.data.accounts.flatMap(
      (account) => account.owners
    );
    return NextResponse.json({ identities }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Error fetching identity data" },
      { status: 500 }
    );
  }
}
