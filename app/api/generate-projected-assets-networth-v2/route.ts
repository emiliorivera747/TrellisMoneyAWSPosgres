import { NextResponse, NextRequest } from "next/server";

// Functions
import { generateProjectedAssets } from "@/utils/api-helpers/projected-financial-assets/generateProjectedAssets";

// Helpers
import { getDates } from "@/utils/api-helpers/dates/getDates";
import { generateProjectedNetWorth } from "@/utils/api-helpers/projected-net-worth/generateProjectedNetWorth";
import {
  FailResponse,
  SuccessResponse,
  ErrorResponse,
} from "@/utils/api-helpers/api-responses/response";
import {
  getMemberWithHouseholdByUserId,
  getExpandedAccounts,
} from "@/utils/drizzle/household/household";

// Auth
import { withAuth } from "@/lib/protected";
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
    const userId = user.id;
    try {
      /**
       * Get the timestamp from the request body
       */
      const { timestamp } = await request.json();

      /**
       * Get the start and end years from the request URL
       */
      const { searchParams } = new URL(request.url);
      const { startYear, endYear } = getDates(searchParams);

      /**
       * Were we given a timestamp
       */
      if (!timestamp) return FailResponse("No timestamp found", 404);

      /**
       *  Get member with household data
       */
      const member = await getMemberWithHouseholdByUserId(userId);
      if (!member) return FailResponse("Failed to find member", 404);

      /**
       * Get the items
       */
      const items = member?.household?.items;
      if (!items || items.length === 0)
        return FailResponse("Items not found for household", 404);

      /**
       * Do we have accounts?
       */
      if (!member.household?.accounts || member.household.accounts.length === 0)
        return FailResponse("Accounts not found for the household", 404);


      if (!member?.household_id)
        return FailResponse("Household not found for member", 404);

      /**
       * Get Expanded Accounts (with holdings and securities)
       */
      const expandedAccounts = await getExpandedAccounts(member.household_id);
      if (!expandedAccounts)
        return FailResponse("Could not retrieve expanded accounts", 404);

      // Transform Drizzle accounts to match expected Account interface
      const transformedAccounts = expandedAccounts.accounts.map((account) => ({
        account_id: account.accountId,
        name: account.accountName,
        official_name: account.officialName,
        mask: account.mask,
        type: account.type.toLowerCase(),
        subtype: account.subtype,
        current: account.currentBalance ? Number(account.currentBalance) : null,
        expected_annual_return_rate: account.expectedAnnualReturnRate
          ? Number(account.expectedAnnualReturnRate)
          : null,
        holdings: account.holdings?.map((holding) => ({
          holding_id: holding.holdingId,
          account_id: holding.accountId,
          security_id: holding.security?.securityId,
          institution_price: holding.institutionPrice
            ? Number(holding.institutionPrice)
            : null,
          institution_value: holding.institutionValue
            ? Number(holding.institutionValue)
            : null,
          cost_basis: holding.costBasis ? Number(holding.costBasis) : null,
          quantity: holding.quantity ? Number(holding.quantity) : null,
          iso_currency_code: holding.isoCurrencyCode,
          expected_annual_return_rate: holding.expectedAnnualReturnRate
            ? Number(holding.expectedAnnualReturnRate)
            : null,
          security: holding.security
            ? {
                security_id: holding.security.securityId,
                name: holding.security.securityName,
                ticker_symbol: holding.security.tickerSymbol,
                type: holding.security.type,
                close_price: holding.security.closePrice
                  ? Number(holding.security.closePrice)
                  : null,
              }
            : undefined,
        })),
      }));

      const projectedNetWorth = await generateProjectedNetWorth(
        transformedAccounts as any,
        startYear,
        endYear,
        searchParams.get("inflationAdjusted") === "true",
        default_inflation_rate
      );

      const projectedAssets = await generateProjectedAssets({
        startYear,
        endYear,
        includesInflation: searchParams.get("inflationAdjusted") === "true",
        annualInflationRate: default_inflation_rate,
        accounts: transformedAccounts as any,
      });

      return SuccessResponse(
        {
          projectedNetWorth: projectedNetWorth,
          projectedAssets: projectedAssets,
        },
        "Accounts, holdings, and securities updated successfully."
      );
    } catch (error) {
      return ErrorResponse(error);
    }
  });
}
