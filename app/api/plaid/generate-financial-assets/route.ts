import { NextResponse, NextRequest } from "next/server";

import { PrismaClient} from "@prisma/client";

//functions
import { validateTimestamp } from "@/utils/api-helpers/projected-net-worth/validateTimestamp";
import { handleMissingData } from "@/utils/api-helpers/projected-net-worth/handleMissingData";
import { handleErrors } from "@/utils/api-helpers/projected-net-worth/handleErrors";
import { generateProjectedFinancialAssets } from "@/utils/api-helpers/projected-financial-assets/generateProjectedFinacialAssetsV2";

// Mock data
import { mockHoldingData } from "@/utils/data/plaid-data/mockHoldingData";
import { mockAccountBalanceData } from "@/utils/data/plaid-data/mockAccountBalanceData";

// Helpers
import { updateAccounts } from "@/utils/api-helpers/plaid/updateAccounts";
import { updateSecurities } from "@/utils/api-helpers/plaid/updateSecurities";
import { updateHoldings } from "@/utils/api-helpers/plaid/updateHoldings";

export async function POST(req: NextRequest): Promise<NextResponse> {
  try {
    const body = await req.json();
    const { timestamp } = body;
    const infaltionRate = 0.025;
    const userId = "88aaaacc-8638-4de3-b20b-5408377596be";

    const { searchParams } = new URL(req.url);
    const start_year = searchParams.get("start_date")
      ? parseInt(searchParams.get("start_date") as string, 10)
      : new Date().getFullYear();
    const end_year = searchParams.get("end_date")
      ? parseInt(searchParams.get("end_date") as string, 10)
      : new Date().getFullYear() + 40;
    const with_inflation = searchParams.get("with_inflation") === "true";

    const accounts = mockAccountBalanceData.accounts;
    const holdings = mockHoldingData.holdings;
    const securities = mockHoldingData.securities;

    handleMissingData(accounts, holdings, securities);
    handleErrors(accounts, holdings, securities);

    // Update the user's accounts, securities, and holdings in the database
    await updateAccounts(accounts, userId);
    await updateSecurities(securities, userId, timestamp);
    await updateHoldings(holdings, userId, timestamp);

    const userHoldings = await getHoldingsAndSecurities(userId);

    // Generate the projected financial assets
    const projectedFinancialAssets = await generateProjectedFinancialAssets(
      start_year,
      end_year,
      with_inflation,
      infaltionRate,
      userHoldings
    );

    return NextResponse.json(
      {
        message: "Accounts, holdings, and securities updated successfully.",
        data: projectedFinancialAssets,
      },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      {
        message: error,
        data: "Server error",
      },
      { status: 500 }
    );
  }
}


/**
 *
 * Gets the user's holdings and securities from the database.
 *
 * @param userId
 * @returns
 */
const getHoldingsAndSecurities = async (userId: string) => {
    const prisma = new PrismaClient();
    const userHoldings = await prisma.user.findMany({
      where: {
        user_id: userId,
      },
      select: {
        holdings: {
          include: {
            security: true,
          },
        },
      },
    });
  
    return userHoldings[0].holdings;
  };