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


export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { timestamp } = body;
  
    validateTimestamp(timestamp);
  
    const userId = "88aaaacc-8638-4de3-b20b-5408377596be";
    const { searchParams } = new URL(req.url);
    const start_date = searchParams.get("start_date");
    const end_date = searchParams.get("end_date");
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
    const start = start_date ? new Date(start_date) : new Date();
    const end = end_date ? new Date(end_date) : new Date(new Date().setFullYear(new Date().getFullYear() + 40));

    const projectedNetWorth = await generateProjectedNetWorth(userHoldings, start, end);

    return NextResponse.json(
      {
        message: "Accounts, holdings, and securities updated successfully.",
        data: projectedNetWorth,
        holdings: userHoldings,
      },
      { status: 200 }
    );
  } catch (error) {
    if (isPrismaErrorWithCode(error)) return handlePrismaErrorWithCode(error);
    if (isPrismaError(error)) return handlePrismaErrorWithNoCode(error);
    return handleOtherErrror(error);
  }
}

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
