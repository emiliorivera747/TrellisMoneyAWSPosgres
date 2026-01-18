import { NextRequest } from "next/server";

import {
  SuccessResponse,
  FailResponse,
  ErrorResponse,
} from "@/utils/api-helpers/api-responses/response";
import { withAuth } from "@/lib/protected";
import { getMemberByUserId } from "@/utils/drizzle/household/household";
import { updateAccounts } from "@/utils/drizzle/accounts/updateAccountsV2";
import { getAccountsFromPlaidWithItems } from "@/services/plaid/getAccountV2";
import { calculateNetWorth } from "@/utils/api-helpers/net-worth/calculateNetWorth";
import { getItemsFromPlaid } from "@/services/plaid/items/items";
import { updateItemsWithPlaidItems } from "@/utils/drizzle/item/updateItems";
import { db } from "@/drizzle/db";
import { eq } from "drizzle-orm";
import { household } from "@/drizzle/schema";

/**
 *
 * The API calculates the user net worth
 *
 * @param req
 * @returns
 */
export async function GET(req: NextRequest) {
  return withAuth(req, async (request, user) => {
    try {
      
      /**
       * Get member
       */
      const member = await getMemberByUserId(user.id);
      if (!member) return FailResponse("Failed to find member", 404);

      // /**
      //  * Get items from member
      //  */
      const items = member?.household?.items;
      if (!items) return FailResponse("Items not found for household", 404);

      /**
       * Get Plaid Items
       */
      const plaidItems = await getItemsFromPlaid(items);
      const updateItems = await updateItemsWithPlaidItems(plaidItems);

      /**
       * Get Accounts from Plaid using items from Database
       */
      const plaidAccounts = await getAccountsFromPlaidWithItems(updateItems);
      const householdAccounts = member.household.accounts || [];
      await updateAccounts(plaidAccounts, householdAccounts);

      if (!member.householdId)
        return FailResponse("No household id found", 404);

      // Re-fetch household with updated accounts to get latest data
      const householdData = await db.query.household.findFirst({
        where: eq(household.householdId, member.householdId),
        with: { accounts: true },
      });
      if (!householdData) return FailResponse("Household not found", 404);


      const accounts = householdData.accounts;
      const data = calculateNetWorth(accounts);

      return SuccessResponse(data, "Success");
    } catch (error) {
      return ErrorResponse(error);
    }
  });
}
