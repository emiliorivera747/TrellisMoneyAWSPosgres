import { AccountBase } from "plaid";
/**
 *
 * Check if the accounts array is empty or undefined.
 *
 *
 * @param accounts
 * @returns
 */
export const noAccountsError = (accounts: AccountBase[][]) => {
  if (!accounts || accounts.length === 0) {
    return {
      status: 404,
      message: "No accounts found",
    };
  }
};
