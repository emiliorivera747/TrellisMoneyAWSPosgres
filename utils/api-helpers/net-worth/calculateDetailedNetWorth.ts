import { Account } from "@/drizzle/schema";

/**
 * Detailed net worth calculation with breakdown by asset/liability categories
 */
export type DetailedNetWorth = {
  totalAssets: number;
  totalLiabilities: number;
  netWorth: number;
  cashAssets: number;
  investmentAssets: number;
  otherAssets: number;
  creditLiabilities: number;
  loanLiabilities: number;
  otherLiabilities: number;
};

/**
 * Calculates detailed net worth with breakdown by asset and liability categories
 *
 * @param accounts - Array of account records
 * @returns Detailed breakdown of net worth, assets, and liabilities
 */
export function calculateDetailedNetWorth(
  accounts: Account[]
): DetailedNetWorth {
  let totalAssets = 0;
  let totalLiabilities = 0;
  let cashAssets = 0;
  let investmentAssets = 0;
  let otherAssets = 0;
  let creditLiabilities = 0;
  let loanLiabilities = 0;
  let otherLiabilities = 0;

  accounts.forEach((account) => {
    const { type, subtype } = account;
    const balance = Number(account?.currentBalance ?? 0);

    // ----- Handle DEPOSITORY account types (cash assets) ------
    if (type === "DEPOSITORY") {
      if (
        [
          "checking",
          "savings",
          "hsa",
          "cd",
          "money market",
          "paypal",
          "prepaid",
          "cash management",
          "ebt",
        ].includes(subtype || "")
      ) {
        cashAssets += balance;
        totalAssets += balance;
      }
    }

    // ------ Handle CREDIT account types (credit liabilities) -----
    else if (type === "CREDIT") {
      if (subtype === "credit card" || subtype === "paypal") {
        creditLiabilities += balance;
        totalLiabilities += balance;
      }
    }

    // ----- Handle LOAN account types (loan liabilities) -----
    else if (type === "LOAN") {
      if (
        [
          "auto",
          "business",
          "commercial",
          "construction",
          "consumer",
          "home equity",
          "mortgage",
          "student",
          "line of credit",
          "overdraft",
          "other",
        ].includes(subtype || "")
      ) {
        loanLiabilities += balance;
        totalLiabilities += balance;
      }
    }

    // ----- Handle INVESTMENT account types (investment assets) -----
    else if (type === "INVESTMENT") {
      if (
        [
          "401a",
          "401k",
          "403B",
          "457b",
          "brokerage",
          "cash isa",
          "crypto exchange",
          "education savings account",
          "fixed annuity",
          "gic",
          "hsa",
          "ira",
          "isa",
          "keogh",
          "lif",
          "lira",
          "lrsp",
          "lrif",
          "mutual fund",
          "non-custodial wallet",
          "non-taxable brokerage account",
          "other",
          "pension",
          "prif",
          "profit sharing plan",
          "qshr",
          "rdsp",
          "resp",
          "retirement",
          "roth",
          "roth 401k",
          "rrif",
          "rrsp",
          "rrif",
          "sipp",
          "stock plan",
          "tfsa",
        ].includes(subtype || "")
      ) {
        investmentAssets += balance;
        totalAssets += balance;
      }
    }

    // ----- Handle OTHER account types (other assets) ------
    else if (type === "OTHER") {
      if (
        subtype === "trust" ||
        subtype === "life insurance" ||
        subtype === "variable annuity" ||
        subtype === "other annuity"
      ) {
        otherAssets += balance;
        totalAssets += balance;
      }
    }
  });

  const netWorth = totalAssets - totalLiabilities;

  return {
    totalAssets,
    totalLiabilities,
    netWorth,
    cashAssets,
    investmentAssets,
    otherAssets,
    creditLiabilities,
    loanLiabilities,
    otherLiabilities,
  };
}
