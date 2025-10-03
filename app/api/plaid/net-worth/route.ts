import { NextResponse, NextRequest } from "next/server";
import { AccountsGetRequest } from "plaid";
import { prisma } from "@/lib/prisma";
import { calculateNetWorth } from "@/utils/api-helpers/calculateNetWorth";
import { getUser } from "@/utils/api-helpers/supabase/getUser";
import { getItemsByUserId } from "@/utils/api-helpers/prisma/itemsService";
import { noItemsError } from "@/utils/api-helpers/errors/itemErrors";
import { getAccountsFromPlaid } from "@/utils/api-helpers/plaid/accounts/getAccountV2";
import { updateAccounts } from "@/utils/api-helpers/plaid/accounts/updateAccountsV2";


export async function GET(req: NextRequest) {
  const request: AccountsGetRequest = {
    access_token: process.env.PLAID_ACCESS_TOKEN || "",
  };

  try {
    const user = await getUser();

    /**
     * Get all institutional items
     * */
    const items = await getItemsByUserId(user?.id || "");
    noItemsError(items);

    /**
     * Plaid Accounts
     */
    // const plaidAccounts = await getAccountsFromPlaid(items);

    /**
     * Store accounts in Database
     */
    // await updateAccounts(plaidAccounts);


    // const response = await client.accountsBalanceGet(request);

    /**
     * Retrieve all accounts
     */
    const accounts = await prisma.account.findMany({
      where: {
        user_id: user?.id || "",
      },
    });

    const data = calculateNetWorth(accounts);

    return NextResponse.json({ data }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Error fetching account balance data" },
      { status: 500 }
    );
  }
}
