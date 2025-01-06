import { NextResponse, NextRequest } from "next/server";
import { AccountsGetRequest } from "plaid";
import { plaidClient } from "@/config/plaidClient";
import { PrismaClient, Prisma } from "@prisma/client";

//functions
import { validateTimestamp } from "@/utils/api-helpers/projected-net-worth/validateTimestamp";
import { handleMissingData } from "@/utils/api-helpers/projected-net-worth/handleMissingData";
import { handleErrors } from "@/utils/api-helpers/projected-net-worth/handleErrors";
import { getPrismaError } from "@/utils/api-helpers/prisma/getPrismaErrorMessage";
import { generateProjectedNetWorth } from "@/utils/api-helpers/projected-net-worth/generateProjectedNetWorth";
import { generateProjectedNetWorthV2 } from "@/utils/api-helpers/projected-net-worth/generateProjectedNetWorthV2";

// Mock data
import { mockHoldingData } from "@/utils/data/plaid-data/mockHoldingData";
import { mockAccountBalanceData } from "@/utils/data/plaid-data/mockAccountBalanceData";

// Helpers
import { authenticateUser } from "@/utils/api-helpers/authenticateUser";
import { updateAccounts } from "@/utils/api-helpers/plaid/updateAccounts";
import { updateSecurities } from "@/utils/api-helpers/plaid/updateSecurities";
import { updateHoldings } from "@/utils/api-helpers/plaid/updateHoldings";
import {
  handlePrismaErrorWithCode,
  isPrismaError,
  handlePrismaErrorWithNoCode,
  isPrismaErrorWithCode,
} from "@/utils/api-helpers/prisma/handlePrismaErrors";
import { handleOtherErrror } from "@/utils/api-helpers/errors/handleErrors";

/**
 * POST /api/plaid/generateProjectedNetWorth
 *
 * @param {NextRequest} req
 * @returns {Promise<NextResponse>}
 */
export async function POST(req: NextRequest): Promise<NextResponse> {
  try {
    const body = await req.json();
    const { timestamp } = body;

    validateTimestamp(timestamp);

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

    // Get the user's updated holdings and securities
    const userHoldings = await getHoldingsAndSecurities(userId);

    console.log("With inflation: ", with_inflation);

    const projectedNetWorth = await generateProjectedNetWorthV2(
      userHoldings,
      start_year,
      end_year,
      with_inflation
    );

    return NextResponse.json(
      {
        message: "Accounts, holdings, and securities updated successfully.",
        data: projectedNetWorth,
      },
      { status: 200 }
    );
  } catch (error) {
    if (isPrismaErrorWithCode(error)) return handlePrismaErrorWithCode(error);

    if (isPrismaError(error)) return handlePrismaErrorWithNoCode(error);
    return handleOtherErrror(error);
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
