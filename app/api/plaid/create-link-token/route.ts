import { NextRequest, NextResponse } from "next/server";
import { withAuth } from "@/lib/protected";
import getLinkToken from "@/services/plaid/link/getLinkToken";

const ERROR_MESSAGES = {
  UNAUTHENTICATED: "User not authenticated",
  LINK_TOKEN_ERROR: "Error generating link token",
};
/**
 * POST /api/plaid/create-link-token
 * @param req - The request object
 * @returns {Promise<NextResponse>} - The response object
 */
export async function POST(req: NextRequest): Promise<NextResponse> {
  return withAuth(req, async (request) => {
    try {
      /**
       * Get the user we want to get the link token for
       */
      const { user_id } = await request.json();

      const linkTokenResponse = await getLinkToken(user_id);

      return NextResponse.json(
        { link_token: linkTokenResponse },
        { status: 200 }
      );
    } catch (error) {
      return NextResponse.json(
        { error: ERROR_MESSAGES.LINK_TOKEN_ERROR },
        { status: 500 }
      );
    }
  });
}
