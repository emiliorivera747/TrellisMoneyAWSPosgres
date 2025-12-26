import { NextResponse, NextRequest } from "next/server";
import prisma from "@/lib/prisma";
import { withAuth } from "@/lib/protected";
ß

/**
 *
 * Makes updates to accounts based on the account id
 *
 * @param req
 * @param param1 search params
 * @returns
 */
export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ _id: string }> }
): Promise<NextResponse> {
  return withAuth(req, async (request, user) => {
    try {
      const body = await request.json();
      const { user_id, annual_growth_rate } = body;
      const { _id } = await params;

      // Validate inputs
      if (!_id || !user_id) {
        return NextResponse.json(
          {
            message: "Missing required fields",
            data: null,
          },
          { status: 400 }
        );
      }

      const updatedAccount = await prisma.account.update({
        where: {
          account_id: _id,
          user_id: user?.id || user_id, // Use authenticated user ID if available
        },
        data: {
          annual_return_rate: annual_growth_rate,
        },
      });

      return NextResponse.json(
        {
          message: "Success",
          data: updatedAccount,
        },
        { status: 200 }
      );
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Unknown error";

      return NextResponse.json(
        {
          message: errorMessage,
          data: null,
        },
        { status: 500 }
      );
    } finally {
      await prisma.$disconnect();
    }
  });
}
