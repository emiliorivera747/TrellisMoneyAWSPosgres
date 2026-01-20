import { NextResponse, NextRequest } from "next/server";
import { db } from "@/drizzle/db";
import { holding, account } from "@/drizzle/schema";
import { eq, sql } from "drizzle-orm";
import { ProjectedAsset } from "@/features/projected-financial-assets/types/projectedAssets";
import { withAuth } from "@/lib/protected";
import {
  SuccessResponse,
  ErrorResponse,
  FailResponse,
} from "@/utils/api-helpers/api-responses/response";
import { getMemberByUserId } from "@/utils/drizzle/household/household";
import { getHoldingsWithHouseholdId } from "@/utils/prisma/holding/holdings";

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
      console.log(assets);

      const member = await getMemberByUserId(user.id);
      if (!member) return FailResponse("Failed to get member from user", 404);

      const householdId = member?.householdId;
      if (!householdId)
        return FailResponse("The members household was not found", 404);

      const holdings = await getHoldingsWithHouseholdId(householdId);
      if (!holdings) return FailResponse("The holdings were not found", 404);

      const assetMap = new Map<string, ProjectedAsset>();

      for (let asset of assets) {
        const accounts = asset.accounts;
        if (!accounts) continue;

        for (let account of accounts) {
          const key = `${account}-${asset.security_id}`;
          if (assetMap.has(key)) continue;
          assetMap.set(key, asset);
        }
      }

      for (let holdingRecord of holdings) {
        const asset = assetMap.get(
          `${holdingRecord.accountId}-${holdingRecord.securityId}`
        );
        const expected_annual_return_rate = asset?.expected_annual_return_rate;

        if (asset && holdingRecord.accountId && holdingRecord.securityId) {
          const holdingId = `${holdingRecord.accountId}-${holdingRecord.securityId}`;
          await db
            .update(holding)
            .set({
              expectedAnnualReturnRate: expected_annual_return_rate
                ? expected_annual_return_rate.toString()
                : "0",
              updatedAt: sql`CURRENT_TIMESTAMP`,
            })
            .where(eq(holding.holdingId, holdingId));
        }
      }

      const res = assets.map(async (asset: ProjectedAsset) => {
        const { account_id, user_id, expected_annual_return_rate, type } =
          asset;

        if (type !== "investment" && account_id) {
          await db
            .update(account)
            .set({
              expectedAnnualReturnRate: expected_annual_return_rate
                ? expected_annual_return_rate.toString()
                : "0",
              updatedAt: sql`CURRENT_TIMESTAMP`,
            })
            .where(eq(account.accountId, account_id));
        }
      });

      return SuccessResponse(res, "Successfull updated assets");
    } catch (error) {
      return ErrorResponse();
    }
  });
}
