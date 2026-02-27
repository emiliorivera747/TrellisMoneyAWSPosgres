import { NextResponse, NextRequest } from "next/server";
import { db } from "@/drizzle/db";
import { account, holding, householdMember } from "@/drizzle/schema";
import { inArray, and, eq } from "drizzle-orm";
import { ProjectedAsset } from "@/features/projected-financial-assets/types/projectedAssets";
import { withAuth } from "@/lib/protected";
import {
  SuccessResponse,
  ErrorResponse,
  FailResponse,
} from "@/utils/api-helpers/api-responses/response";
import { getMemberByUserId } from "@/utils/drizzle/household/household";

/**
 *
 * This route is used to update the financial assets of a user.
 *
 * @param req
 * @returns
 */
export async function PATCH(req: NextRequest): Promise<NextResponse> {
  return withAuth(req, async (request, user) => {
    try {
      const assets: ProjectedAsset[] = await request.json();

      const member = await getMemberByUserId(user.id);
      if (!member) return FailResponse("Failed to get member from user", 404);

      const householdId = member?.householdId;
      if (!householdId)
        return FailResponse("The members household was not found", 404);

      // Get all member IDs for this household (used to scope account updates)
      const memberRows = await db
        .select({ id: householdMember.householdMemberId })
        .from(householdMember)
        .where(eq(householdMember.householdId, householdId));

      const memberIds = memberRows.map((m) => m.id);
      if (memberIds.length === 0)
        return FailResponse("No members found in household", 404);

      for (const asset of assets) {
        const accountIds = asset.accounts?.filter((id): id is string => id !== undefined);
        if (!accountIds || accountIds.length === 0) continue;

        const expectedAnnualReturnRate = asset.expected_annual_return_rate?.toString();
        if (expectedAnnualReturnRate == null) continue;

        // Update accounts scoped to this household
        await db
          .update(account)
          .set({ expectedAnnualReturnRate })
          .where(
            and(
              inArray(account.accountId, accountIds),
              inArray(account.householdMemberId, memberIds)
            )
          );

        // Update holdings for these accounts
        await db
          .update(holding)
          .set({ expectedAnnualReturnRate })
          .where(inArray(holding.accountId, accountIds));
      }

      return SuccessResponse("Successfully updated assets");
    } catch (error) {
      return ErrorResponse(error);
    }
  });
}
