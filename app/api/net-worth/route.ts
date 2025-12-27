import { NextRequest } from "next/server";

import {
  SuccessResponse,
  FailResponse,
  ErrorResponse,
} from "@/utils/api-helpers/api-responses/response";
import { withAuth } from "@/lib/protected";
import { getServerErrorMessage } from "@/utils/api-helpers/errors/getServerErrorMessage";
import { getMemberByUserId } from "@/utils/prisma/household/household";
import { logError } from "@/utils/api-helpers/errors/logError";
import { updateAccounts } from "@/utils/prisma/accounts/updateAccountsV2";
import { getAccountsFromPlaid } from "@/services/plaid/getAccountV2";
import { calculateNetWorth } from "@/utils/api-helpers/net-worth/calculateNetWorth";
import prisma from "@/lib/prisma";

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
      if (!items) {
        logError("Items not found for household");
        return FailResponse("Items not found for household", 404);
      }
      /**
       * Plaid Accounts
       */
      const plaidAccounts = await getAccountsFromPlaid(items);

      await updateAccounts(plaidAccounts, member?.household?.accounts || []);

      if (!member.household_id) {
        logError("No household id found");
        return FailResponse("No household id found", 404);
      }

      const household = await prisma.household.findUnique({
        where: { household_id: member?.household_id },
        include: { accounts: true },
      });

      if (!household) {
        logError("Household not found");
        return FailResponse("Household not found", 404);
      }

      const data = calculateNetWorth(household.accounts);

      return SuccessResponse(data, "Success");
    } catch (error) {
      return ErrorResponse(getServerErrorMessage(error));
    }
  });
}
