import { NextResponse, NextRequest } from "next/server";

// Functions
import { validateTimestamp } from "@/utils/api-helpers/projected-net-worth/validateTimestamp";
import { generateProjectedAssets } from "@/utils/api-helpers/projected-financial-assets/generateProjectedAssets";

// Helpers
import {
  handlePrismaErrorWithCode,
  isPrismaError,
  handlePrismaErrorWithNoCode,
  isPrismaErrorWithCode,
} from "@/utils/api-helpers/errors/handlePrismaErrors";
import { handleOtherErrror } from "@/utils/api-helpers/errors/handleErrors";
import { getDates } from "@/utils/api-helpers/dates/getDates";
import { getAccountsHoldingsSecuritiesV2 } from "@/utils/prisma/accounts-holdings-securities/getAccountsHoldingsSecurities";
import { generateProjectedNetWorth } from "@/utils/api-helpers/projected-net-worth/generateProjectedNetWorth";
import { getAccountsFromPlaid } from "@/services/plaid/getAccountV2";
import { getInvestmentsPlaid } from "@/utils/prisma/investments/getInvestments";

// Auth
import { withAuth } from "@/lib/protected";

import {
  FailResponse,
  SuccessResponse,
} from "@/utils/api-helpers/api-responses/response";
import { getMemberByUserId } from "@/utils/prisma/household/household";
import { logError } from "@/utils/api-helpers/errors/logError";

const default_inflation_rate = 0.025;

/**
 * POST /api/plaid/generateProjectedNetWorth
 *
 * @param {NextRequest} req
 * @returns {Promise<NextResponse>}
 */
export async function POST(req: NextRequest): Promise<NextResponse> {
  return withAuth(req, async (request, user) => {
    try {
      
      /**
       * Get the timestamp from the request body
       */
      const { timestamp } = await request.json();

      /**
       * Get the start and end years from the request URL
       */
      const { searchParams } = new URL(request.url);
      const { start_year, end_year } = getDates(searchParams);
      validateTimestamp(timestamp);

      const member = await getMemberByUserId(user.id);
      if (!member) return FailResponse("Failed to find member", 404);
      const items = member?.household?.items;
      if (!items) {
        logError("Items not found for household");
        return FailResponse("Items not found for household", 404);
      }

      if (!member.household?.accounts) {
        logError("Accounts not found for the household");
        return FailResponse("Accounts not found for the household", 404);
      }

      /**
       * Get the user's accounts
       */
      await getAccountsFromPlaid(items);
      await getInvestmentsPlaid(
        items,
        timestamp || "",
        member.household?.accounts,
        user.id
      );

      if (!member?.household_id) {
        logError("Accounts not found for the household");
        return FailResponse("Accounts not found for the household", 404);
      }

      const account_holdings_securities = await getAccountsHoldingsSecuritiesV2(
        member.household_id
      );

      const projected_net_worth = await generateProjectedNetWorth(
        account_holdings_securities[0].accounts,
        start_year,
        end_year,
        searchParams.get("with_inflation") === "true",
        default_inflation_rate
      );

      const projected_assets = await generateProjectedAssets({
        start_year,
        end_year,
        with_inflation: searchParams.get("with_inflation") === "true",
        annual_inflation_rate: default_inflation_rate,
        accounts: account_holdings_securities[0].accounts,
      });

      return SuccessResponse(
        { projected_net_worth, projected_assets },
        "Accounts, holdings, and securities updated successfully."
      );
    } catch (error) {
      if (isPrismaErrorWithCode(error)) return handlePrismaErrorWithCode(error);
      if (isPrismaError(error)) return handlePrismaErrorWithNoCode(error);
      return handleOtherErrror(error);
    }
  });
}
