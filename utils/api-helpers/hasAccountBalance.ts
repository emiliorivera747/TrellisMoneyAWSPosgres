import { NextResponse } from "next/server";
import { Account } from "@/types/plaid";
import { AccountBase } from "plaid";

export const hasAccountBalance = (account: AccountBase) => {
  if (!account.balances) {
    return NextResponse.json(
      { message: "Account balances are missing" },
      { status: 500 }
    );
  }
};
