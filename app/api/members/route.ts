import { NextRequest, NextResponse } from "next/server";
import { withAuth } from "@/lib/protected";
import {
  SuccessResponse,
  ErrorResponse,
  FailResponse,
} from "@/utils/api-helpers/api-responses/response";

import { getUserHouseholdMembership } from "@/utils/prisma/household-member/members";
import { logError } from "@/utils/api-helpers/errors/logError";
import { getServerErrorMessage } from "@/utils/api-helpers/errors/getServerErrorMessage";
import prisma from "@/lib/prisma";

/**
 * GET /api/members
 */
export async function GET(req: NextRequest): Promise<NextResponse> {
  return withAuth(req, async (request, user) => {
    const user_id = user.id;
    try {
      const householdMember = await prisma.householdMember.findUnique({
        where: { user_id },
        include: {
          household: {
            include: {
              members: true,
            },
          },
        },
      });
      return SuccessResponse({
        members: householdMember?.household?.members,
      });
    } catch (error) {
      const errorMessage = getServerErrorMessage(error);
      logError(errorMessage);
      return ErrorResponse(errorMessage);
    }
  });
}

/**
 * POST /api/members
 * Adds a new member to the household of the authenticated user.
 */
export async function POST(req: NextRequest): Promise<NextResponse> {
  return withAuth(req, async (request, user) => {
    try {
      // ----- Parse the request body to extract the name and email of the new member -----
      const body = await request.json();
      const { name, email } = body;
      const user_id = user.id;

      // ----- Validate that both name and email are provided -----
      if (!name || !email)
        return FailResponse("Name and email are required", 404);

      if (!user_id) return FailResponse("Failled to get user ID", 404);

      // ----- Retreive the membership -----
      const householdMember = await prisma.householdMember.findUnique({
        where: { user_id },
        select: { household_id: true },
      });
      // ----- Create a new household member with the provided name and email -----
      const household_id = householdMember?.household_id;
      const newMember = await prisma.householdMember.create({
        data: {
          name,
          email,
          household_id,
        },
      });
      return SuccessResponse({ member: newMember });
    } catch (error) {
      const message = getServerErrorMessage(error);
      console.error(message);
      return ErrorResponse(getServerErrorMessage(error));
    }
  });
}
