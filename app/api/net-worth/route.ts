import { NextRequest } from "next/server";

import {
  SuccessResponse,
  FailResponse,
  ErrorResponse,
} from "@/utils/api-helpers/api-responses/response";
import { withAuth } from "@/lib/protected";
import { calculateNetWorth } from "@/utils/api-helpers/net-worth/calculateNetWorth";
import { getItemsByUserId } from "@/utils/drizzle/item/getItem";
import { getAccountsFromItems } from "@/utils/drizzle/accounts/getAccount";

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

      const items = await getItemsByUserId(user.id);
      if (!items) return FailResponse("Items not found for household", 404);

      const accounts = await getAccountsFromItems(items);
      if (!accounts || accounts.length === 0)
        return FailResponse("No accounts found", 404);

      const data = calculateNetWorth(accounts);

      return SuccessResponse(data, "Success");
    } catch (error) {
      return ErrorResponse(error);
    }
  });
}
