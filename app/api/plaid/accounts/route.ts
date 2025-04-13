import { NextResponse, NextRequest } from "next/server";
import { getItemsByUserId } from "@/utils/api-helpers/prisma/itemsService";
import { getUser } from "@/utils/api-helpers/supabase/getUser";
import { getAccounts } from "@/utils/api-helpers/plaid/getAccountV2";
import { noAccountsError } from "@/utils/api-helpers/errors/accountErrors";
import { updateAccounts } from "@/utils/api-helpers/plaid/updateAccountsV2";

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

    /**
     *  Go through each item and fetch the accounts
     */
    const accounts = await getAccounts(items);

    noAccountsError(accounts);

    console.log("Accounts: ", accounts);
    /**
     *  Store the accounts in the database
     */
    // await updateAccounts(accounts, user?.id);

    return NextResponse.json(
      { message: "Retrieve accounts", data: accounts },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Error fetching account balance data" },
      { status: 500 }
    );
  }
}
