import { NextResponse, NextRequest } from "next/server";
import { PrismaClient, Prisma } from "@prisma/client";
 
const prisma = new PrismaClient();

export async function PATCH(req: NextRequest): Promise<NextResponse> {
  try {

    const body = await req.json();
    const { account_id, security_id, user_id, annual_growth_rate } = body;

    const updatedHolding = await prisma.holding.update({
      where: {
        holding_id: {
          security_id: security_id,
          account_id: account_id,
          user_id: user_id,
        },
      },
      data: {
        annual_return_rate: annual_growth_rate
      },
    });

    return NextResponse.json(
      {
        message: "Success",
        data: updatedHolding,
      },
      { status: 200 }
    );
  } catch (error) {

    const errorMessage = error instanceof Error ? error.message : "Unknown error";

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
