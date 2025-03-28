import { NextResponse, NextRequest } from "next/server";

//functions
import { validateTimestamp } from "@/utils/api-helpers/projected-net-worth/validateTimestamp";
import { handleMissingData } from "@/utils/api-helpers/projected-net-worth/handleMissingData";
import { handleErrors } from "@/utils/api-helpers/projected-net-worth/handleErrors";
import { generateProjectedNetWorthV2 } from "@/utils/api-helpers/projected-net-worth/generateProjectedNetWorthV2";
import { generateProjectedFinancialAssetsV2 } from "@/utils/api-helpers/projected-financial-assets/generateProjectedFinacialAssetsV2";


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
import { getItemsById } from "@/utils/api-helpers/prisma/getItemsById";
import { getAccounts } from "@/utils/api-helpers/plaid/getAccounts";
import { getHoldingsAndSecuritiesMock } from "@/utils/api-helpers/plaid/getHoldingsAndSecuritiesMock";
import { getHoldingsAndSecurities } from "@/utils/api-helpers/prisma/getHoldingsAndSecurities";
import { getAccountsHoldingsSecurities} from '@/utils/api-helpers/prisma/getAccountsHoldingsSecurities';



//supabase
import { createClient } from "@/utils/supabase/server";

//types
import { Item } from "@/types/plaid";

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
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    /**
     * Get the start and end years from the request URL
     */
    const { searchParams } = new URL(req.url);
    const { start_year, end_year } = getDates(searchParams);
    validateTimestamp(timestamp);

    /**
     * Get the user's accounts
     */
    const items: Item[] = await getItemsById(user?.id || "");
    const accounts = await getAccounts(items);

    /**
     *  Get the user's holdings and securities
     */
    const res = await getHoldingsAndSecuritiesMock(
      "access-production-7b9e2f4d-8c1a-4e5b-a2d3-f6e7890c3d2b"
    );

    if (res) {
      /**
       * Handle missing data and errors
       */
      handleMissingData(accounts, res.holdings, res.securities);
      handleErrors(accounts, res.holdings, res.securities);

      /**
       * Update the user's accounts, securities, and holdings
       */
      await updateAccounts(accounts, user?.id || "");
      await updateSecurities(res?.securities, user?.id || "", timestamp);
      await updateHoldings(res?.holdings, user?.id || "", timestamp);
    }

    // Get the user's updated holdings and securities
    const userHoldings = await getHoldingsAndSecurities(user?.id || "");
    const account_holdings_securities = await getAccountsHoldingsSecurities(user?.id || "");
    const projected_net_worth = await generateProjectedNetWorthV2(
      userHoldings,
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
        data: {projected_net_worth: projected_net_worth, projected_assets: projected_assets},
      },
      { status: 200 }
    );
  } catch (error) {
    if (isPrismaErrorWithCode(error)) return handlePrismaErrorWithCode(error);
    if (isPrismaError(error)) return handlePrismaErrorWithNoCode(error);
    return handleOtherErrror(error);
  }
}