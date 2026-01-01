
import { Account } from "@/types/plaid";
import { AccountType } from "@/features/projected-financial-assets/types/projectedAssetsCard";

export interface GenerateAssetsFromAccountsParams {
  accounts: Account[];
  years: number;
  includes_inflation: boolean;
  annual_inflation_rate: number;
  type: AccountType;
}


