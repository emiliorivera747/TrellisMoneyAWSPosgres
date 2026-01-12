import { NextRequest } from "next/server";

import {
  SuccessResponse,
  FailResponse,
  ErrorResponse,
} from "@/utils/api-helpers/api-responses/response";
import { withAuth } from "@/lib/protected";
import { getMemberByUserId } from "@/utils/drizzle/household/household";
import { updateAccounts } from "@/utils/drizzle/accounts/updateAccountsV2";
import { getAccountsFromPlaid } from "@/services/plaid/getAccountV2";
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
      const member = await getMemberByUserId(user.id);
      if (!member) return FailResponse("Failed to find member", 404);

      const items = member?.household?.items;
      if (!items) return FailResponse("Items not found for household", 404);

      const plaidItems = await getItemsFromPlaid(items);
      const updateItems = await updateItemsWithPlaidItems(plaidItems);

      const plaidAccounts = await getAccountsFromPlaid(updateItems);
      await updateAccounts(plaidAccounts, member?.household?.accounts || []);

      if (!member.household_id)
        return FailResponse("No household id found", 404);

      const householdData = await db.query.household.findFirst({
        where: eq(household.householdId, member.household_id),
        with: { accounts: true },
      });

      if (!householdData) return FailResponse("Household not found", 404);
      
      // Transform Drizzle accounts to match the expected Account type format
      const transformedAccounts = householdData.accounts.map((acc) => ({
        account_id: acc.accountId,
        name: acc.name,
        type: acc.type,
        subtype: acc.subtype,
        current: acc.current ? Number(acc.current) : null,
        available: acc.available ? Number(acc.available) : null,
        limit: acc.limit ? Number(acc.limit) : null,
        mask: acc.mask,
        official_name: acc.officialName,
        verification_status: acc.verificationStatus,
        persistent_account_id: acc.persistentAccountId,
        expected_annual_return_rate: acc.annualReturnRate ? Number(acc.annualReturnRate) : null,
        iso_currency_code: acc.isoCurrencyCode,
        unofficial_currency_code: acc.unofficialCurrencyCode,
        item_id: acc.itemId,
        user_id: acc.userId,
      }));
      
      const data = calculateNetWorth(transformedAccounts);

      return SuccessResponse("data", "Success");
    } catch (error) {
      return ErrorResponse(error);
    }
  });
}
