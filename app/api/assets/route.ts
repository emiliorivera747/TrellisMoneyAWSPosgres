import { NextResponse, NextRequest } from "next/server";
import prisma from "@/lib/prisma";
import { Assets } from "@/types/assets";
import { withAuth } from "@/lib/protected";
import {
  SuccessResponse,
  ErrorResponse,
  FailResponse,
} from "@/utils/api-helpers/api-responses/response";
import { getMemberByUserId } from "@/utils/prisma/household/household";
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
      const assets: Assets[] = await request.json();
      console.log(assets);

      const member = await getMemberByUserId(user.id);
      if (!member) return FailResponse("Failed to get member from user", 404);

      const { household } = member;
      if (!household?.household_id)
        FailResponse("The members household was not found", 404);

      const holdings = await getHoldingsWithHouseholdId(
        household?.household_id ?? ""
      );
      if (!holdings) return FailResponse("The holdings were not found", 404);

      const assetMap = new Map<string, Assets>();

      for (let asset of assets) {
        for (let account of asset.accounts) {
          const key = `${account}-${asset.security_id}`;
          if (assetMap.has(key)) continue;
          assetMap.set(key, asset);
        }
      }

      for (let holding of holdings) {
        const asset = assetMap.get(`${holding.account_id}-${holding.security_id}`);
        const expected_expected_annual_return_rate = asset?.expected_expected_annual_return_rate;

        if (asset)
          await prisma.holding.update({
            where: {
              holding_id: {
                security_id: holding.security_id,
                account_id: holding.account_id,
                user_id: holding.user_id,
              },
            },
            data: { expected_expected_annual_return_rate },
          });
      }

      const res = assets.map(async (asset: Assets) => {
        const { account_id, user_id, expected_expected_annual_return_rate, type } = asset;

        if (type !== "investment") {
          await prisma.account.update({
            where: {
              account_id: account_id ?? "",
              user_id: user_id ?? "",
            },
            data: {
              expected_expected_annual_return_rate: expected_expected_annual_return_rate,
            },
          });
        }
      });

      return SuccessResponse(res, "Successfull updated assets");
    } catch (error) {
      return ErrorResponse();
    }
  });
}
