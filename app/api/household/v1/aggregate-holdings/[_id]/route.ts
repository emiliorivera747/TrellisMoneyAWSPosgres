import { NextRequest } from "next/server";
import { withAuth } from "@/lib/protected";
import { db } from "@/drizzle/db";
import { eq, inArray, and } from "drizzle-orm";
import { holding, account, security, householdMember } from "@/drizzle/schema";

// Utils
import { getMembers } from "@/utils/drizzle/household-member/members";
import {
  SuccessResponse,
  ErrorResponse,
  FailResponse,
} from "@/utils/api-helpers/api-responses/response";

// Types
import { AggregateHoldingDetails } from "@/types/api-routes/holding/holding";

/**
 * Handles GET requests for aggregate holdings for a specific security.
 *
 * @param req - HTTP request of type `NextRequest`.
 * @param params - Route parameters containing the security ID.
 * @returns Success or error response with aggregated holdings data for the security.
 *
 * Steps:
 * 1. Extract security ID from route parameters.
 * 2. Retrieve user's household members.
 * 3. Fetch investment accounts for those members.
 * 4. Fetch all holdings for the specific security with account and member details.
 * 5. Aggregate values across all holdings.
 * 6. Return response with aggregated holding details.
 */
export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ _id: string }> }
) {
  return withAuth(req, async (_request, user) => {
    const { _id: securityId } = await params;

    if (!securityId) {
      return FailResponse("Security ID not provided", 400);
    }
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

      // Get all holdings for the specific security with account and member details
      const holdings = await db
        .select({
          holdingId: holding.holdingId,
          accountId: holding.accountId,
          quantity: holding.quantity,
          institutionValue: holding.institutionValue,
          costBasis: holding.costBasis,
          updatedAt: holding.updatedAt,
          security: {
            tickerSymbol: security.tickerSymbol,
            securityName: security.securityName,
          },
          account: {
            accountName: account.accountName,
          },
          member: {
            fullName: householdMember.fullName,
          },
        })
        .from(holding)
        .innerJoin(security, eq(holding.securityId, security.securityId))
        .innerJoin(account, eq(holding.accountId, account.accountId))
        .innerJoin(
          householdMember,
          eq(account.householdMemberId, householdMember.householdMemberId)
        )
        .where(
          and(
            inArray(holding.accountId, accountIds),
            eq(holding.securityId, securityId)
          )
        );

      if (holdings.length === 0) {
        return FailResponse("No holdings found for this security", 404);
      }

      // Aggregate all holdings for this security
      const ticker = holdings[0].security.tickerSymbol || "UNKNOWN";
      const securityName = holdings[0].security.securityName || "Unknown Security";

      let totalShares = 0;
      let totalValueSum = 0;
      let totalCostBasisSum = 0;
      const holdingsArray: AggregateHoldingDetails["holdings"] = [] as any;

      for (const h of holdings) {
        // Parse numeric values
        const shares = parseFloat(h.quantity || "0");
        const totalValue = parseFloat(h.institutionValue || "0");
        const costBasis = parseFloat(h.costBasis || "0");
        const totalReturn = totalValue - costBasis;

        totalShares += shares;
        totalValueSum += totalValue;
        totalCostBasisSum += costBasis;

        holdingsArray.push({
          holdingId: h.holdingId,
          account: { name: h.account.accountName },
          member: { name: h.member.fullName },
          shares: shares,
          totalValue: totalValue,
          averageCost: costBasis,
          totalReturn: totalReturn,
          updatedAt: new Date(h.updatedAt || new Date()),
        });
      }

      const aggregatedHolding: AggregateHoldingDetails = {
        tickerSymbol: ticker,
        securityName: securityName,
        totalValue: totalValueSum.toFixed(2),
        averageCost: totalCostBasisSum.toFixed(2),
        totalReturn: (totalValueSum - totalCostBasisSum).toFixed(2),
        shares: totalShares.toFixed(4),
        holdings: holdingsArray as any,
      };

      return SuccessResponse(
        aggregatedHolding,
        "Successfully retrieved aggregate holdings for security"
      );
    } catch (error) {
      return ErrorResponse(error);
    }
  });
}
