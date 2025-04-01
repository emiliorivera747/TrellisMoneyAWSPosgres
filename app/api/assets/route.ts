import { NextResponse, NextRequest } from "next/server";
import { PrismaClient } from "@prisma/client";
import { FinancialAssets } from "@/features/projected-financial-assets/types/projectedAssets";

const prisma = new PrismaClient();

export async function PATCH(req: NextRequest): Promise<NextResponse> {
  try {
    const body = await req.json();

    const res = body.map(async (asset: FinancialAssets) => {
      if (asset.type === "investment") {
        const { security_id, account_id, user_id, annual_growth_rate } = asset;
        await prisma.holding.update({
          where: {
            holding_id: {
              security_id: security_id ?? "",
              account_id: account_id ?? "",
              user_id: user_id ?? "",
            },
          },
          data: {
            annual_return_rate: annual_growth_rate,
          },
        });
      } else {
        const { account_id, user_id, annual_growth_rate } = asset;
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

    // const updatedHolding = await prisma.holding.update({
    //   where: {
    //     holding_id: {
    //       security_id: security_id,
    //       account_id: account_id,
    //       user_id: user_id,
    //     },
    //   },
    //   data: {
    //     annual_return_rate: annual_growth_rate
    //   },
    // });

    return NextResponse.json(
      {
        message: "Success",
        data: res,
      },
      { status: 200 }
    );
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";

    return NextResponse.json(
      {
        message: errorMessage,
        data: "Server error",
      },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}
