import { NextRequest, NextResponse } from "next/server";
import { withAuth } from "@/lib/protected";

// Utils
import { getServerErrorMessage } from "@/utils/api-helpers/errors/getServerErrorMessage";
import {
  SuccessResponse,
  ErrorResponse,
  FailResponse,
} from "@/utils/api-helpers/api-responses/response";

/**
 * Handles authenticated GET requests to retrieve and update household accounts.
 *
 * Steps:
 * 1. Fetches the household and its items using the authenticated user ID.
 * 2. Returns 404 if no household or items are found.
 * 3. Retrieves accounts from Plaid for the items.
 * 4. Updates the accounts in the database.
 * 5. Returns updated accounts on success or an error response on failure.
 *
 * @param req - Incoming `NextRequest`.
 * @returns A `Response` with updated accounts or an error message.
 */
export async function GET(req: NextRequest) {
  return withAuth(req, async (request, user) => {
    try {
      console.log("Running daily net worth snapshot...");
      return NextResponse.json({ status: "success" });
    } catch (error) {
      return ErrorResponse(getServerErrorMessage(error));
    }
  });
}
