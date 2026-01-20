import { NextRequest } from "next/server";
import { withAuth } from "@/lib/protected";
import { db } from "@/drizzle/db";
import { eq, inArray } from "drizzle-orm";
import { holding } from "@/drizzle/schema";

// Util
import {
  getMemberByUserId,
  getHouseholdByHouseholdId,
} from "@/utils/drizzle/household/household";
import { getItemsWithHouseholdMemeberIds } from "@/utils/drizzle/item/getItem";
import {
  SuccessResponse,
  ErrorResponse,
  FailResponse,
} from "@/utils/api-helpers/api-responses/response";

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
       * Get the member using the user id
       */
      const member = await getMemberByUserId(user.id);
      if (!member) return FailResponse("Failed to get member from user", 404);

      /**
       * Get the household by the household id
       */
      const household = await getHouseholdByHouseholdId(member.householdId);
      if (!household) return FailResponse("Household not found", 404);

      /**
       * Get household ids
       */
      const householdMemberIds = household.householdMembers.map(
        (m) => m.householdMemberId
      );

      /**
       * Get the item ids
       */
      const itemIds = await getItemsWithHouseholdMemeberIds(householdMemberIds);
      if (!itemIds || itemIds.length === 0)
        return FailResponse("No items found for the given household ID", 404);

      // Get holdings for all household members
      const holdingsData = await db
        .select()
        .from(holding)
        .where(inArray(holding.householdMemberId, householdMemberIds));

      if (!holdingsData || holdingsData.length === 0)
        return FailResponse(
          "No holdings found for the given household ID",
          404
        );

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

      if (!householdWithData) return FailResponse("Household not found", 404);

      // Flatten accounts from all household members
      const allAccounts = householdWithData.householdMembers.flatMap(
        (member) => member.accounts || []
      );

      // Create the response structure matching the Prisma format
      const householdResponse = {
        ...householdWithData,
        accounts: allAccounts,
      };
      console.log(householdResponse);
      return SuccessResponse(
        { household: householdResponse },
        "Successfully retrieved Investment"
      );
    } catch (error) {
      return ErrorResponse(error);
    }
  });
}
