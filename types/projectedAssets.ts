import { Account, Holding } from "@/types/plaid";
import { AccountType } from "@/features/projected-financial-assets/types/projectedAssetsCard";
import { Decimal } from "decimal.js";
export interface GenerateAssetsFromAccountsParams {
  accounts: Account[];
  years: number;
  includes_inflation: boolean;
  annual_inflation_rate: number;
  type: AccountType;
}

export interface GroupedHolding {
  security_id: string;
  name: string;
  quantity: Decimal;
  institution_value: Decimal;
  annual_return_rate: number;
  subtype: string;
  account_id: string;
  accounts: (undefined | string)[];
}

export interface GroupedHoldingToAssetsParams {
  grouped_holding: GroupedHolding;
  years: number;
  includes_inflation: boolean;
  annual_inflation_rate: number;
  type?: AccountType;
}

export interface GroupedHoldingsToAssetsParams {
  grouped_holdings: GroupedHolding[];
  years: number;
  includes_inflation: boolean;
  annual_inflation_rate: number;
  type: AccountType;
}

export interface CashHoldingsToAssets {
  cash_holdings: (Holding & { accountName: string })[];
  years: number;
  includes_inflation: boolean;
  annual_inflation_rate: number;
  type: AccountType;
}
