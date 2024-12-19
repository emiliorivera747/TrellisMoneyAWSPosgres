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

export async function GET(req: NextRequest) {
  const userId = "88aaaacc-8638-4de3-b20b-5408377596be";
  const { searchParams } = new URL(req.url);
  const start_date = searchParams.get("start_date");
  const end_date = searchParams.get("end_date");

  console.log("Start Date: ", start_date);
  console.log("End Date: ", end_date);

  try {
    const accounts = mockAccountBalanceData.accounts;
    const holdings = mockHoldingData.holdings;
    const securities = mockHoldingData.securities;

    handleErrors(accounts, holdings, securities);

    try {
      await updateAccounts(accounts, userId);
      await updateSecurities(securities, userId);
      await updateHoldings(holdings, userId);
    } catch (error) {
      console.log("Error: ", error);
      return NextResponse.json(
        { error: error instanceof Error ? error.message : String(error) },
        { status: 500 }
      );
      
    }

    return NextResponse.json(
      {
        message: "Accounts, holdings, and securities updated successfully.",
        accounts,
      },
      { status: 200 }
    );
  } catch (error) {
    console.log("Error: ", error.message);
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