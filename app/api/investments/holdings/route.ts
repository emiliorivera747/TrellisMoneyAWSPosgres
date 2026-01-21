import { NextRequest } from "next/server";
import { withAuth } from "@/lib/protected";
import { db } from "@/drizzle/db";
import { eq, inArray } from "drizzle-orm";
import { holding, account, security } from "@/drizzle/schema";

// Util
import { getMembers } from "@/utils/drizzle/household-member/members";
import {
  SuccessResponse,
  ErrorResponse,
  FailResponse,
} from "@/utils/api-helpers/api-responses/response";

/**
 * Handles GET requests for investment holdings.
 *
 * @param req - HTTP request of type `NextRequest`.
 * @returns Success or error response.
 *
 * Steps:
 * 1. Retrieve user's household members.
 * 2. Fetch investment accounts for those members.
 * 3. Fetch holdings for those accounts with security details.
 * 4. Return response with all investment data.
 */
export async function GET(req: NextRequest) {
  return withAuth(req, async (request, user) => {
    try {
      // Get all household members for this user
      const members = await getMembers(user.id);

      if (members.length === 0)
        return FailResponse("No household members found for this user", 404);

      // Extract member IDs
      const memberIds = members.map((m) => m.householdMemberId);

      // Get all investment accounts for these members
      const investmentAccounts = await db
        .select()
        .from(account)
        .where(inArray(account.householdMemberId, memberIds));

      if (investmentAccounts.length === 0)
        return FailResponse("No investment accounts found", 404);

      // Extract account IDs
      const accountIds = investmentAccounts.map((acc) => acc.accountId);

      // Get all holdings for these accounts with security details
      const holdings = await db
        .select({
          holdingId: holding.holdingId,
          accountId: holding.accountId,
          institutionPrice: holding.institutionPrice,
          institutionPriceAsOf: holding.institutionPriceAsOf,
          institutionPriceDatetime: holding.institutionPriceDatetime,
          institutionValue: holding.institutionValue,
          costBasis: holding.costBasis,
          quantity: holding.quantity,
          isoCurrencyCode: holding.isoCurrencyCode,
          vestedQuantity: holding.vestedQuantity,
          vestedValue: holding.vestedValue,
          expectedAnnualReturnRate: holding.expectedAnnualReturnRate,
          createdAt: holding.createdAt,
          updatedAt: holding.updatedAt,
          security: {
            securityId: security.securityId,
            securityName: security.securityName,
            tickerSymbol: security.tickerSymbol,
            isCashEquivalent: security.isCashEquivalent,
            type: security.type,
            closePrice: security.closePrice,
            closePriceAsOf: security.closePriceAsOf,
            isoCurrencyCode: security.isoCurrencyCode,
            sector: security.sector,
            industry: security.industry,
          },
        })
        .from(holding)
        .innerJoin(security, eq(holding.securityId, security.securityId))
        .where(inArray(holding.accountId, accountIds));

      // Group holdings by account
      const accountsWithHoldings = investmentAccounts.map((acc) => ({
        ...acc,
        holdings: holdings.filter((h) => h.accountId === acc.accountId),
      }));

      return SuccessResponse(
        { accounts: accountsWithHoldings },
        "Successfully retrieved investments"
      );
    } catch (error) {
      return ErrorResponse(error);
    }
  });
}
