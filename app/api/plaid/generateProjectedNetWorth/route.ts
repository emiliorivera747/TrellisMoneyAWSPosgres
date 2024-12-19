import { NextResponse, NextRequest } from "next/server";
import { AccountsGetRequest } from "plaid";
import { plaidClient } from "@/config/plaidClient";

// Mock data
import { mockHoldingData } from "@/utils/data/plaid-data/mockHoldingData";
import { mockAccountBalanceData } from "@/utils/data/plaid-data/mockAccountBalanceData";

// Helpers
import { authenticateUser } from "@/utils/api-helpers/authenticateUser";
import { updateAccounts } from "@/utils/api-helpers/plaid/updateAccounts";
import { updateSecurities } from "@/utils/api-helpers/plaid/updateSecurities";
import { updateHoldings } from "@/utils/api-helpers/plaid/updateHoldings";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { timestamp } = body;

  validateTimestamp(timestamp);

  const userId = "88aaaacc-8638-4de3-b20b-5408377596be";
  const { searchParams } = new URL(req.url);
  const start_date = searchParams.get("start_date");
  const end_date = searchParams.get("end_date");

  try {
    const accounts = mockAccountBalanceData.accounts;
    const holdings = mockHoldingData.holdings;
    const securities = mockHoldingData.securities;

    handleErrors(accounts, holdings, securities);

    await updateAccounts(accounts, userId);
    await updateSecurities(securities, userId, timestamp);
    await updateHoldings(holdings, userId, timestamp);

    return NextResponse.json(
      {
        message: "Accounts, holdings, and securities updated successfully.",
        accounts,
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : String(error) },
      { status: 500 }
    );
  }
}

function handleErrors(accounts: any, holdings: any, securities: any) {
  if (!accounts) throw new Error("No accounts found");
  if (!holdings) throw new Error("No holdings found");
  if (!securities) throw new Error("No securities found");
}

function validateTimestamp(timestamp: any) {
  if (!timestamp) {
    throw new Error("Timestamp is required.");
  }
}
