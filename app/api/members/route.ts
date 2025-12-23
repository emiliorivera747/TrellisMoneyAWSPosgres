import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { withAuth } from "@/lib/protected";
import {
  SuccessResponse,
  ErrorResponse,
  FailResponse,
} from "@/utils/api-helpers/api-responses/response";

/**
 * GET /api/members
 */
export async function GET(req: NextRequest): Promise<NextResponse> {
  return withAuth(req, async (request, user) => {
    try {
      const household = await prisma.household.findUnique({
        where: {
          household_id: user.id,
        },
        include: {
          members: true,
        },
      });

      /**
       * If household exists then return the members of the household
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
  });
}

/**
 * POST /api/members
 * Adds a new member to the household of the authenticated user.
 */
export async function POST(req: NextRequest): Promise<NextResponse> {
  return withAuth(req, async (request, user) => {
    try {
      // Parse the request body to extract the name and email of the new member
      const body = await request.json();
      const { name, email } = body;

      // Validate that both name and email are provided
      if (!name || !email)
        return FailResponse("Name and email are required", 404);

      // Find the household associated with the authenticated user
      const household = await prisma.household.findUnique({
        where: {
          household_id: user.id,
        },
      });

      // If the household does not exist, return an error response
      if (!household) return FailResponse("Household not found", 404);

      // Create a new household member with the provided name and email
      const newMember = await prisma.householdMember.create({
        data: {
          name,
          email,
          household_id: household.household_id,
        },
      });

      // Return a success response with the newly created member
      return NextResponse.json(
        { data: { member: newMember, status: "success" } },
        { status: 201 }
      );
    } catch (error) {
      // Handle any errors that occur during the process
      const errorMessage =
        error instanceof Error ? error.message : "There was a server error";
      return NextResponse.json({ error: errorMessage }, { status: 500 });
    }
  });
}
