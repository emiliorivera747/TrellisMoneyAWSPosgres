import { NextResponse, NextRequest } from "next/server";
import { db } from "@/drizzle/db";
import { account, holding } from "@/drizzle/schema";
import { inArray, and, eq } from "drizzle-orm";
import { ProjectedAsset } from "@/features/projected-financial-assets/types/projectedAssets";
import { withAuth } from "@/lib/protected";
import {
  SuccessResponse,
  ErrorResponse,
  FailResponse,
} from "@/utils/api-helpers/api-responses/response";
import { getMemberByUserId } from "@/utils/drizzle/household/household";
import { getHoldingsWithHouseholdId } from "@/utils/drizzle/holdings/getHoldings";

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

      const holdings = await getHoldingsWithHouseholdId(householdId);
      if (!holdings) return FailResponse("The holdings were not found", 404);

      console.log("assets", assets);

      for (let asset of assets) {
        const accountIds = asset.accounts?.filter((id) => id !== undefined);
        if (!accountIds || accountIds.length === 0) continue;
        const expectedAnnualReturnRate =
          asset.expected_annual_return_rate?.toString();

        // const res = await db
        //   .update(account)
        //   .set({expectedAnnualReturnRate}).join(account.)

        // console.log("res", res);
      }

      return SuccessResponse("Successfull updated assets");
    } catch (error) {
      return ErrorResponse(error);
    }
  });
}
