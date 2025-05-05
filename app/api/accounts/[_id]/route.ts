import { NextResponse, NextRequest } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ _id: string }> }
): Promise<NextResponse> {
  try {

    const body = await req.json();
    const { user_id, annual_growth_rate } = body;
    const {_id} = await params;

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
        user_id: user_id,
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

    const errorMessage = error instanceof Error ? error.message : "Unknown error";
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
}