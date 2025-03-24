import { NextResponse, NextRequest } from "next/server";
import { PrismaClient} from "@prisma/client";

//functions
import { validateTimestamp } from "@/utils/api-helpers/projected-net-worth/validateTimestamp";
import { handleMissingData } from "@/utils/api-helpers/projected-net-worth/handleMissingData";
import { handleErrors } from "@/utils/api-helpers/projected-net-worth/handleErrors";
import { generateProjectedNetWorthV2 } from "@/utils/api-helpers/projected-net-worth/generateProjectedNetWorthV2";

// Mock data
import { mockHoldingData } from "@/utils/data/plaid-data/mockHoldingData";
import { mockAccountBalanceData } from "@/utils/data/plaid-data/mockAccountBalanceData";

// Helpers
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
import { getDates } from "@/utils/api-helpers/getDates";

//supabase
import { createClient } from "@/utils/supabase/server";

const default_inftaltion_rate = 0.025;


/**
 * POST /api/plaid/generateProjectedNetWorth
 *
 * @param {NextRequest} req
 * @returns {Promise<NextResponse>}
 */
export async function POST(req: NextRequest): Promise<NextResponse> {
  try {
   
    /**
     * Get the timestamp from the request body
     */
    const { timestamp } = await req.json();

    /**
     * Get the user's information
     */
    const supabase = await createClient();  
    const { data : { user } } = await supabase.auth.getUser();

    /**
     * Get the start and end years from the request URL
     */
    const { searchParams } = new URL(req.url);
    const { start_year, end_year } = getDates(searchParams);

    validateTimestamp(timestamp);

    const userId = user?.id || '';


    /**
     *  Get all of the items
     */
    const items = pri

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

    const projectedNetWorth = await generateProjectedNetWorthV2(
      userHoldings,
      start_year,
      end_year,
      searchParams.get("with_inflation") === "true",
      default_inftaltion_rate
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
