import { NextResponse, NextRequest } from "next/server";
import prisma from "@/lib/prisma";
import { FinancialAssets } from "@/features/projected-financial-assets/types/projectedAssets";
import { withAuth } from "@/lib/protected";
import {
  SuccessResponse,
  ErrorResponse,
} from "@/utils/api-helpers/api-responses/response";

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
      const assets = await request.json();

      console.log("assets", assets);

      /**
       * Get all of the holdings associated with the user
       */
      const holdings = await prisma.holding.findMany({
        where: {
          user_id: assets[0].user_id,
        },
      });

      const hashmap = new Map<string, FinancialAssets>();

      /**
       * Create a hashmap of all the assets associated with the user
       */
      assets.forEach((asset: FinancialAssets) => {
        const key = `${asset.security_id}-${asset.account_id}`;
        if (!hashmap.has(key)) hashmap.set(key, asset);
      });

      /**
       * Update all holdings associated with the user
       */
      holdings.map(async (holding) => {
        const asset = hashmap.get(
          holding.security_id + "-" + holding.account_id
        );

        if (asset) {
          await prisma.holding.update({
            where: {
              holding_id: {
                security_id: holding.security_id,
                account_id: holding.account_id,
                user_id: holding.user_id,
              },
            },
            data: {
              annual_return_rate: asset.annual_growth_rate,
            },
          });
        }
      });

      const res = assets.map(async (asset: FinancialAssets) => {
        const { account_id, user_id, annual_growth_rate, type } = asset;

        // Only update if the asset is not an investment type
        if (type !== "investment") {
          await prisma.account.update({
            where: {
              account_id: account_id ?? "",
              user_id: user_id ?? "",
            },
            data: {
              annual_return_rate: annual_growth_rate,
            },
          });
        }
      });

      return SuccessResponse(res, "Successfull updated assets");
    } catch (error) {
      return ErrorResponse();
    } finally {
      await prisma.$disconnect();
    }
  });
}
