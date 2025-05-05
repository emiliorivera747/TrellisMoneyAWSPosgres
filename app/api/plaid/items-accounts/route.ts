import { NextResponse, NextRequest } from "next/server";
import { getItemsByUserId, getItemsAndAccountsByUserId } from "@/utils/api-helpers/prisma/itemsService";
import { getUser } from "@/utils/api-helpers/supabase/getUser";
import { getAccounts } from "@/utils/api-helpers/plaid/accounts/getAccountV2";
import { noAccountsError } from "@/utils/api-helpers/errors/accountErrors";
import { updateAccounts } from "@/utils/api-helpers/plaid/accounts/updateAccountsV2";
import { noItemsError } from "@/utils/api-helpers/errors/itemErrors";

export async function GET(req: Request) {
  try {
    const user = await getUser();

    // const items = await getItemsByUserId(user?.id || "");

    // noItemsError(items); // Check if the items are empty or undefined
    
    // /**
    //  *  Go through each item and fetch the accounts
    //  */
    // const accounts = await getAccounts(items);

    // noAccountsError(accounts); // Check if the accounts are empty or undefined

    // /**
    //  *  Store the accounts in the database
    //  */
    // await updateAccounts(accounts);

    const itemsWithAccounts = await getItemsAndAccountsByUserId(user?.id || "");

    // console.log("Items with accounts", itemsWithAccounts);

    return NextResponse.json(
      { message: "Retrieved institutional items", data: itemsWithAccounts },
      { status: 200 }
    );

  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";
      console.log("Error", errorMessage);

    return NextResponse.json({ message: errorMessage }, { status: 500 });
  }
}
