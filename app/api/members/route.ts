import { NextRequest, NextResponse } from "next/server";
import { getUser } from "@/utils/api-helpers/supabase/getUser";

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

/**
 * GET /api/members
 */
export async function GET(req: NextRequest): Promise<NextResponse> {
  try {
    
    
    /**
     * Get the user
     */
    const user = await getUser();


    if (!user)
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

    const household = await prisma.household.findUnique({
      where: {
        household_id: user.id,
      },
      include: {
        members: true,
      },
    });

    /**
     * If household exist then return the members of the household
     * otherwise return the current user.
     */
    if (household) {
      return NextResponse.json(
        {
          data: { members: household.members, status: "success" },
        },
        { status: 200 }
      );
    } else {
      const userDB = await prisma.user.findUnique({
        where: {
          user_id: user.id,
        },
      });

      return NextResponse.json(
        {
          data: { members: [userDB], status: "success" },
        },
        { status: 200 }
      );
    }
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "There was a server error";
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
