import { NextRequest} from "next/server";
import { getItemsByUserId } from "@/utils/prisma/item/itemsService";
import { getAccountsFromPlaidWithItems } from "@/services/plaid/getAccountV2";
import { updateAccounts } from "@/utils/prisma/accounts/updateAccountsV2";
import { noItemsError } from "@/utils/api-helpers/errors/itemErrors";
import { withAuth } from "@/lib/protected";
import {
  SuccessResponse,
  ErrorResponse,
  FailResponse,
} from "@/utils/api-helpers/api-responses/response";
import { getServerErrorMessage } from "@/utils/api-helpers/errors/getServerErrorMessage";

/**
 *
 * Fetch all of the users accounts from Plaid and
 * store them in the database.
 *
 */
export async function GET(req: NextRequest) {
  return withAuth(req, async (request, user) => {
    try {
      const items = await getItemsByUserId(user?.id || "");
      noItemsError(items);

      /**
       *  Go through each item and fetch the accounts
       */
      const accounts = await getAccountsFromPlaidWithItems(items);

      /**
       *  Store the accounts in the database
       */
      const updatedAccounts = await updateAccounts(accounts);

      if (!updateAccounts) return FailResponse("Failed to update account", 500);

      return SuccessResponse(
        { accounts: updatedAccounts },
        "Retrieved accounts"
      );
    } catch (error) {
      return ErrorResponse(getServerErrorMessage(error));
    }
  });
}
