import { NextResponse } from "next/server";
import { AccountBaseWithItemId } from "@/types/services/plaid/plaid";

/**
 * Checks whether the account has a balance or not.
 *
 * @param account
 * @returns
 */
export const hasAccountBalance = (account: AccountBaseWithItemId) => {
  if (!account.balances) throw new Error("Account balances are missing");
};
