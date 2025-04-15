import { NextResponse, NextRequest } from "next/server";
import { getItemsByUserId } from "@/utils/api-helpers/prisma/itemsService";
import { getUser } from "@/utils/api-helpers/supabase/getUser";
import { getAccounts } from "@/utils/api-helpers/plaid/accounts/getAccountV2";
import { noAccountsError } from "@/utils/api-helpers/errors/accountErrors";
import { updateAccounts } from "@/utils/api-helpers/plaid/accounts/updateAccountsV2";
import { noItemsError } from "@/utils/api-helpers/errors/itemErrors";

/**
 *
 * Fetch all of the users accounts from Plaid and
 * store them in the database.
 *
 * @param req
 * @returns
 */
export async function GET(req: NextRequest) {
  try {
    const user = await getUser();

    const items = await getItemsByUserId(user?.id || "");

    noItemsError(items); // Check if the items are empty or undefined
    
    /**
     *  Go through each item and fetch the accounts
     */
    const accounts = await getAccounts(items);

    noAccountsError(accounts); // Check if the accounts are empty or undefined

    /**
     *  Store the accounts in the database
     */
    await updateAccounts(accounts);

    return NextResponse.json(
      { message: "Retrieved accounts", data: accounts },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Error fetching account balance data" },
      { status: 500 }
    );
  }
}
