import { NextRequest } from "next/server";

import {
  SuccessResponse,
  FailResponse,
  ErrorResponse,
} from "@/utils/api-helpers/api-responses/response";
import { withAuth } from "@/lib/protected";
import { getMemberByUserId } from "@/utils/prisma/household/household";
import { updateAccounts } from "@/utils/prisma/accounts/updateAccountsV2";
import { getAccountsFromPlaid } from "@/services/plaid/getAccountV2";
import { calculateNetWorth } from "@/utils/api-helpers/net-worth/calculateNetWorth";
import prisma from "@/lib/prisma";

import { getItemsFromPlaid } from "@/services/plaid/items/items";
import { updateItemsWithPlaidItems } from "@/utils/prisma/item/updateItems";

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
      const member = await getMemberByUserId(user.id);
      if (!member) return FailResponse("Failed to find member", 404);

      const items = member?.household?.items;
      if (!items) return FailResponse("Items not found for household", 404);

      const plaidItems = await getItemsFromPlaid(items);
      const updateItems =await updateItemsWithPlaidItems(plaidItems);

      const plaidAccounts = await getAccountsFromPlaid(updateItems);
      await updateAccounts(plaidAccounts, member?.household?.accounts || []);

      if (!member.household_id)
        return FailResponse("No household id found", 404);

      const household = await prisma.household.findUnique({
        where: { household_id: member?.household_id },
        include: { accounts: true },
      });

      if (!household) return FailResponse("Household not found", 404);
      const data = calculateNetWorth(household.accounts);

      return SuccessResponse(data, "Success");
    } catch (error) {
      return ErrorResponse(error);
    }
  });
}
