import { NextResponse, NextRequest } from "next/server";

// Functions
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
import { generateProjectedNetWorth } from "@/utils/api-helpers/projected-net-worth/generateProjectedNetWorth";
import { getInvestmentsPlaid } from "@/utils/prisma/investments/getInvestments";
import {
  FailResponse,
  SuccessResponse,
} from "@/utils/api-helpers/api-responses/response";
import { getExpandedAccounts } from "@/utils/prisma/accounts-holdings-securities/getAccountsHoldingsSecurities";

// Auth
import { withAuth } from "@/lib/protected";
import { getMemberWithHouseholdByUserId } from "@/utils/prisma/household/household";

const default_inflation_rate = 0.025;

/**
 * POST /api/generate-projected-assets-networth-v2
 * Generates projected assets and net worth for a user.
 * @export
 * @param {NextRequest} req - The incoming request object.
 * @returns {Promise<NextResponse>} A response containing projected net worth and assets.
 */
export async function POST(req: NextRequest): Promise<NextResponse> {
  return withAuth(req, async (request, user) => {
    const user_id = user.id;
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

      /**
       * Were we given a timestamp
       */
      if (!timestamp) return FailResponse("No timestamp found", 404);

      /**
       *  Get member
       */
      const member = await getMemberWithHouseholdByUserId({
        user_id,
        householdInclude: { accounts: true, items: true, holdings: true },
      });
      if (!member) return FailResponse("Failed to find member", 404);

      /**
       * Get the items
       */
      const items = member?.household?.items;
      if (!items) return FailResponse("Items not found for household", 404);

      /**
       * Do we have accounts?
       */
      if (!member.household?.accounts)
        return FailResponse("Accounts not found for the household", 404);

      /**
       * Get the investments from Plaid
       */
      await getInvestmentsPlaid(
        items,
        timestamp || "",
        member.household?.accounts,
        member.household?.holdings,
        user.id
      );

      if (!member?.household_id)
        return FailResponse("Household not found for member", 404);

      /**
       * Get Expanded Accounts
       */
      const expandedAccounts = await getExpandedAccounts(member.household_id);
      if (!expandedAccounts)
        return FailResponse("Could retrieve exapanded accounts", 404);

      const projectedNetWorth = await generateProjectedNetWorth(
        expandedAccounts.accounts,
        start_year,
        end_year,
        searchParams.get("includes_inflation") === "true",
        default_inflation_rate
      );

      const projectedAssets = await generateProjectedAssets({
        start_year,
        end_year,
        includes_inflation: searchParams.get("includes_inflation") === "true",
        annual_inflation_rate: default_inflation_rate,
        accounts: expandedAccounts.accounts,
      });

      return SuccessResponse(
        {
          projected_net_worth: projectedNetWorth,
          projected_assets: projectedAssets,
        },
        "Accounts, holdings, and securities updated successfully."
      );
    } catch (error) {
      if (isPrismaErrorWithCode(error)) return handlePrismaErrorWithCode(error);
      if (isPrismaError(error)) return handlePrismaErrorWithNoCode(error);
      return handleOtherErrror(error);
    }
  });
}
