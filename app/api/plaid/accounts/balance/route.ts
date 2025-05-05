import { NextResponse, NextRequest } from "next/server";
import { AccountsGetRequest } from "plaid";
import { prisma } from "@/lib/prisma";


export async function GET(req: NextRequest) {

  const request: AccountsGetRequest = {
    access_token: process.env.PLAID_ACCESS_TOKEN || "",
  };

  try {
    // const response = await plaidClient.accountsBalanceGet(request);
    // const accounts = response.data.accounts;
    const accounts = await prisma.account.findMany();
    return NextResponse.json({ accounts }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Error fetching account balance data" },
      { status: 500 }
    );
  }
}
