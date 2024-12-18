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
  const userId = "fbac251b-987c-4115-b294-5dce141a339f";
  const { searchParams } = new URL(req.url);
  const start_date = searchParams.get("start_date");
  const end_date = searchParams.get("end_date");

  console.log("Start Date: ", start_date);
  console.log("End Date: ", end_date);

  try {
    const accounts = mockAccountBalanceData.accounts;
    const holdings = mockHoldingData.holdings;
    const securities = mockHoldingData.securities;
    await updateAccounts(accounts, userId);
    await updateSecurities(securities, userId);
    await updateHoldings(holdings, userId);

    return NextResponse.json(
      {
        message: "Accounts, holdings, and securities updated successfully.",
        accounts,
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Error fetching projected net worth data" },
      { status: 500 }
    );
  }
}







