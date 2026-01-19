import { NextRequest } from "next/server";
import { validateTimestamp } from "@/utils/api-helpers/projected-net-worth/validateTimestamp";
import { withAuth } from "@/lib/protected";

import { db } from "@/drizzle/db";
import { eq, inArray } from "drizzle-orm";
import { household, householdMember, account, holding, item } from "@/drizzle/schema";

// Util
import { getMemberByUserId } from "@/utils/drizzle/household/household";
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

      const member = await getMemberByUserId(user.id);
      if (!member) return FailResponse("Failed to get member from user", 404);

      if (!member.householdId)
        return FailResponse("No household ID found for member", 404);

      // Get household with accounts
      const householdData = await db.query.household.findFirst({
        where: eq(household.householdId, member.householdId),
        with: {
          householdMembers: true,
        },
      });

      if (!householdData)
        return FailResponse("Household not found", 404);

      // Get all household member IDs for this household
      const householdMemberIds = householdData.householdMembers.map(
        (m) => m.householdMemberId
      );

      // Get items for all household members - fetch full item records
      const itemIds = await db
        .selectDistinct({ itemId: item.itemId })
        .from(item)
        .innerJoin(account, eq(account.itemId, item.itemId))
        .where(inArray(account.householdMemberId, householdMemberIds));

      if (!itemIds || itemIds.length === 0)
        return FailResponse("No items found for the given household ID", 404);

      const items = await db
        .select()
        .from(item)
        .where(inArray(item.itemId, itemIds.map((i) => i.itemId)));

      // Get holdings for all household members
      const holdingsData = await db
        .select()
        .from(holding)
        .where(inArray(holding.householdMemberId, householdMemberIds));

      if (!holdingsData || holdingsData.length === 0)
        return FailResponse("No holdings found for the given household ID", 404);


      // Fetch household with accounts, holdings, and securities
      const householdWithData = await db.query.household.findFirst({
        where: eq(household.householdId, member.householdId),
        with: {
          householdMembers: {
            with: {
              accounts: {
                with: {
                  holdings: {
                    with: {
                      security: true,
                    },
                  },
                },
              },
            },
          },
        },
      });

      if (!householdWithData)
        return FailResponse("Household not found", 404);

      // Flatten accounts from all household members
      const allAccounts = householdWithData.householdMembers.flatMap(
        (member) => member.accounts || []
      );

      // Create the response structure matching the Prisma format
      const householdResponse = {
        ...householdWithData,
        accounts: allAccounts,
      };
      console.log(householdResponse)
      return SuccessResponse(
        { household: householdResponse },
        "Successfully retrieved Investment"
      );
    } catch (error) {
      return ErrorResponse(error);
    }
  });
}
