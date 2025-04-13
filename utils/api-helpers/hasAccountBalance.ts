import { NextResponse } from "next/server";
import { AccountBaseWithItemId } from "@/types/plaid";

export const hasAccountBalance = (account: AccountBaseWithItemId) => {
  if (!account.balances) {
    return NextResponse.json(
      { message: "Account balances are missing" },
      { status: 500 }
    );
  }
};
