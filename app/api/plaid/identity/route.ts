import { NextResponse, NextRequest } from "next/server";
import { getAccounts } from "@/services/plaid/getAccountV2";
import { noItemsError } from "@/utils/api-helpers/errors/itemErrors";
import { withAuth } from "@/lib/protected";

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
      noItemsError(items); // Check if the items are empty or undefined

      /**
       *  Go through each item and fetch the accounts
       */
      const accounts = await getAccounts(items);

      /**
       *  Store the accounts in the database
       */
      await updateAccounts(accounts);

      const accountsWithIds = await getAccountWithItemIds(items);

      // noAccountsError(accountsWithIds); // Check if the accounts are empty or undefined

      return NextResponse.json(
        { message: "Retrieved accounts", data: accountsWithIds },
        { status: 200 }
      );
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Unknown error";
      return NextResponse.json({ error: errorMessage }, { status: 500 });
    }
  });
}
