import { NextRequest } from "next/server";
import { validateTimestamp } from "@/utils/api-helpers/projected-net-worth/validateTimestamp";
import { withAuth } from "@/lib/protected";

import prisma from "@/lib/prisma";

// Util
import { getMemberByUserId } from "@/utils/prisma/household/household";
import {
  SuccessResponse,
  ErrorResponse,
  FailResponse,
} from "@/utils/api-helpers/api-responses/response";

import { getInvestmentsWithItemsPlaid } from "@/utils/prisma/investments/getInvestments";

/**
 * Handles GET requests for investment holdings data.
 *
 * @param req - Incoming HTTP request of type `NextRequest`.
 * @returns A Promise resolving to a success or error response.
 *
 * @remarks
 * Steps:
 * 1. Validate `timestamp` query parameter.
 * 2. Retrieve user's member data (accounts, items, holdings).
 * 3. Ensure user has associated items and holdings.
 * 4. Fetch investment holdings data using the `timestamp`.
 * 5. Return success or error response.
 *
 * @throws Error if `timestamp` is invalid or any operation fails.
 */
export async function GET(req: NextRequest) {
  return withAuth(req, async (request, user) => {
    try {
      /**
       * Extract the timestamp from the query parameters
       * and validate it to ensure it is in the correct format.
       */
      const { searchParams } = new URL(request.url);
      const timestamp = searchParams.get("timestamp");
      validateTimestamp(timestamp);

      const member = await getMemberByUserId(user.id, {
        accounts: true,
        items: true,
        holdings: true,
      });
      if (!member) return FailResponse("Failed to get member from user", 404);

      /**
       * Retrieve the items associated with the authenticated user.
       * If no items are found, throw an appropriate error.
       */
      const items = member.household?.items;
      if (!items || items.length === 0)
        return FailResponse("No items found for the given household ID", 404);

      const holdings = member.household?.holdings;
      if (!holdings)
        return FailResponse("No items found for the given household ID", 404);

      /**
       * Fetch the investment holdings data for the user's items
       * based on the provided timestamp.
       */
      await getInvestmentsWithItemsPlaid({
        items,
        timestamp: timestamp || "",
        user_id: user.id,
        holdings,
      });

      const household = await prisma.household.findUnique({
        where: { household_id: member.household_id },
        include: { accounts: { include: { holdings: { include: { security: true } } } } },
      });

      return SuccessResponse(
        { household },
        "Successfully retrieved Investment"
      );
    } catch (error) {
      return ErrorResponse(error);
    }
  });
}
