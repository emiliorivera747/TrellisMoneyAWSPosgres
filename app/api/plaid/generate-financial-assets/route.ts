import { NextResponse, NextRequest } from "next/server";

//prisma
import { PrismaClient} from "@prisma/client";

//supabase
import { createClient } from "@/utils/supabase/server";

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
import { getDates } from "@/utils/api-helpers/getDates";

const default_infaltion_rate = 0.025;

/**
 * POST /api/plaid/generate-financial-assets
 * 
 * Updates the user's accounts, securities, and holdings in the database and generates the projected financial assets.
 * 
 * @param req 
 * @returns 
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

    const accounts = mockAccountBalanceData.accounts;
    const holdings = mockHoldingData.holdings;
    const securities = mockHoldingData.securities;

    handleMissingData(accounts, holdings, securities);
    handleErrors(accounts, holdings, securities);

    // Update the user's accounts, securities, and holdings in the database
    if (!user?.id)  throw new Error("User ID is missing");
    await updateAccounts(accounts, user.id);
    await updateSecurities(securities, user.id, timestamp);
    await updateHoldings(holdings, user.id, timestamp);
    const userHoldings = await getHoldingsAndSecurities(user.id);

    // Generate the projected financial assets
    const projectedFinancialAssets = await generateProjectedFinancialAssets(
      start_year,
      end_year,
      searchParams.get("with_inflation") === "true",
      default_infaltion_rate,
      userHoldings
    );

    return NextResponse.json(
      {
        message: "Accounts, holdings, and securities updated successfully.",
        data: projectedFinancialAssets,
      },
      { status: 200 }
    );

  } 
  catch (error) 
  {
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