import { NextResponse} from "next/server";
import { Account } from "@/types/plaid";

export const hasAccountBalance = (account: Account) => {
    if (!account.balances){
      return NextResponse.json(
        { message: "Account balances are missing" },
        { status: 500 }
      );
    }
  }