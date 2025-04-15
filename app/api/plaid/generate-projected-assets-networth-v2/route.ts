import { NextResponse, NextRequest } from "next/server";

//functions
import { validateTimestamp } from "@/utils/api-helpers/projected-net-worth/validateTimestamp";
import { handleMissingData } from "@/utils/api-helpers/projected-net-worth/handleMissingData";
import { handleErrors } from "@/utils/api-helpers/projected-net-worth/handleErrors";
import { generateProjectedFinancialAssetsV2 } from "@/utils/api-helpers/projected-financial-assets/generateProjectedFinacialAssetsV2";

// Helpers
import { updateSecurities } from "@/utils/api-helpers/plaid/investments/updateSecurities";
import { updateHoldings } from "@/utils/api-helpers/plaid/investments/updateHoldings";
import {
  handlePrismaErrorWithCode,
  isPrismaError,
  handlePrismaErrorWithNoCode,
  isPrismaErrorWithCode,
} from "@/utils/api-helpers/prisma/handlePrismaErrors";
import { handleOtherErrror } from "@/utils/api-helpers/errors/handleErrors";
import { getDates } from "@/utils/api-helpers/getDates";
import { getItemsById } from "@/utils/api-helpers/prisma/getItemsById";
import { getHoldingsAndSecuritiesMock } from "@/utils/api-helpers/plaid/getHoldingsAndSecuritiesMock";
import { getHoldingsAndSecurities } from "@/utils/api-helpers/prisma/getHoldingsAndSecurities";
import { getAccountsHoldingsSecurities } from "@/utils/api-helpers/prisma/getAccountsHoldingsSecurities";
import { generateProjectedNetWorthV3 } from "@/utils/api-helpers/projected-net-worth/generateProjectedNetWorthV3";
import { getItemsByUserId } from "@/utils/api-helpers/prisma/itemsService";
import { getAccounts } from "@/utils/api-helpers/plaid/accounts/getAccountV2";
import { updateAccounts } from "@/utils/api-helpers/plaid/accounts/updateAccountsV2";
import { updateHoldingsAndSecurities } from "@/utils/api-helpers/plaid/investments/updateHoldingsAndSecurities";
import { getUser } from "@/utils/api-helpers/supabase/getUser";
import { getInvestments } from "@/utils/api-helpers/plaid/investments/getInvestments";

//types
import { ItemPrisma } from "@/types/prisma";

const default_inflation_rate = 0.025;

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
    const user = await getUser();

    /**
     * Get the start and end years from the request URL
     */
    const { searchParams } = new URL(req.url);
    const { start_year, end_year } = getDates(searchParams);
    validateTimestamp(timestamp);

    // /**
    //  * Get the user's accounts
    //  */
    // const items: ItemPrisma[] = await getItemsByUserId(user?.id || "");
    // await getAccounts(items);
    // await getInvestments(items, timestamp || "");

    //Get the user's updated holdings and securities
    const account_holdings_securities = await getAccountsHoldingsSecurities(
      user?.id || ""
    );
    const projected_net_worth = await generateProjectedNetWorthV3(
      account_holdings_securities[0].accounts,
      start_year,
      end_year,
      searchParams.get("with_inflation") === "true",
      default_inflation_rate
    );

    const projected_assets = await generateProjectedFinancialAssetsV2(
      start_year,
      end_year,
      searchParams.get("with_inflation") === "true",
      default_inflation_rate,
      account_holdings_securities[0].accounts
    );

    return NextResponse.json(
      {
        message: "Accounts, holdings, and securities updated successfully.",
        data: {
          projected_net_worth: projected_net_worth,
          projected_assets: projected_assets,
        },
      },
      { status: 200 }
    );
  } catch (error) {
    if (isPrismaErrorWithCode(error)) return handlePrismaErrorWithCode(error);
    if (isPrismaError(error)) return handlePrismaErrorWithNoCode(error);
    return handleOtherErrror(error);
  }
}
