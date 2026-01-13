import { NextRequest, NextResponse } from "next/server";
import { withAuth } from "@/lib/protected";
import {
  SuccessResponse,
  ErrorResponse,
  FailResponse,
} from "@/utils/api-helpers/api-responses/response";
import {
  getMembersWithUserId,
  getMemberByUserId,
  createMember,
} from "@/utils/api-helpers/members/members";

/**
 * GET /api/members
 */
export async function GET(req: NextRequest): Promise<NextResponse> {
  return withAuth(req, async (request, user) => {
    try {
      const householdMembers = await getMembersWithUserId(user.id);
      return SuccessResponse({
        members: householdMembers,
      });
    } catch (error) {
      return ErrorResponse(error);
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
      const householdMember = await getMemberByUserId(user.id);

      // ----- Create a new household member with the provided name and email -----
      const householdId = householdMember?.householdId;
      const newMember = await createMember({ name, email, householdId });

      return SuccessResponse({ member: newMember });
    } catch (error) {
      return ErrorResponse(error);
    }
  });
}
