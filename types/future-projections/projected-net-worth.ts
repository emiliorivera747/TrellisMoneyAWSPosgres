import { Account } from "@/types/services/plaid/plaid";

export interface PopulateMapWithFvParams {
  projectionsMap: Map<number, number>;
  start_year: number;
  end_year: number;
  accounts: Account[];
  includes_inflation: boolean;
  annual_inflation_rate: number;
}
