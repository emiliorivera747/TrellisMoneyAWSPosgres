import { NextRequest, NextResponse } from "next/server";
import { withAuth } from "@/lib/protected";
import getLinkToken from "@/services/plaid/link/getLinkToken";

import { SuccessResponse } from "@/utils/api-helpers/api-responses/response";
import { ErrorResponse } from "@/utils/api-helpers/api-responses/response";
import { getServerErrorMessage } from "@/utils/api-helpers/errors/getServerErrorMessage";
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
      const { member_id } = await request.json();
      const linkTokenResponse = await getLinkToken(member_id);

      return SuccessResponse({
        link_token: linkTokenResponse,
        member_id,
      });
    } catch (error) {
      console.error(error);
      return ErrorResponse(getServerErrorMessage(error));
    }
  });
}
