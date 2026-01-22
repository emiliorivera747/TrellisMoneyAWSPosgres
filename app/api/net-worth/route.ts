import { NextRequest } from "next/server";

import {
  SuccessResponse,
  FailResponse,
  ErrorResponse,
} from "@/utils/api-helpers/api-responses/response";
import { withAuth } from "@/lib/protected";
import { getMemberWithHouseholdByUserId } from "@/utils/drizzle/household/household";
import { updateAccounts } from "@/utils/drizzle/accounts/updateAccounts";
import { getAccountsFromPlaidWithItems } from "@/services/plaid/getAccountV2";
import { calculateNetWorth } from "@/utils/api-helpers/net-worth/calculateNetWorth";
import { getItemsFromPlaid } from "@/services/plaid/items/items";
import { updateItemsWithPlaidItems } from "@/utils/drizzle/item/updateItems";
import { db } from "@/drizzle/db";
import { eq } from "drizzle-orm";
import { household } from "@/drizzle/schema";
import { getItemsByUserId } from "@/utils/drizzle/item/getItem";
import { getAccountWithItemIds } from "@/utils/prisma/accounts/accountService";

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
       * Get items from member
       */
      const items = await getItemsByUserId(user.user_id);
      if (!items) return FailResponse("Items not found for household", 404);

      const itemIds = items.map((item) => item.itemId);

      const accounts = await getAccountWithItemIds(itemIds);
      if (!accounts) return FailResponse("No accounts found", 404);
      const data = calculateNetWorth(accounts);

      return SuccessResponse(data, "Success");
    } catch (error) {
      return ErrorResponse(error);
    }
  });
}
