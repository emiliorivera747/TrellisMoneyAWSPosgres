import { NextResponse } from "next/server";
import { AccountBaseWithItemId } from "@/types/plaid";

/**
 * Checks whether the account has a balance or not.
 * 
 * @param account 
 * @returns 
 */
export const hasAccountBalance = (account: AccountBaseWithItemId) => {
  if (!account.balances) {
    return NextResponse.json(
      { message: "Account balances are missing" },
      { status: 500 }
    );
  }
};
