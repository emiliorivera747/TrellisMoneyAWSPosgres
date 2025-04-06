import { AccountType } from "@/features/projected-financial-assets/types/projectedAssetsCard";

export interface Assets {
  name: string;
  annual_growth_rate: number;
  projection: number;
  security_id: string | undefined;
  account_id: string | undefined;
  type: AccountType;
  shares: number;
  user_id?: string | undefined;
}

export interface AssetsWithType{
  type: AccountType;
  assets: Assets[];
}


