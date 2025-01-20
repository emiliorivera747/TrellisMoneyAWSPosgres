import { UseFormRegister, Path, FieldValues, FieldErrors} from "react-hook-form";

export type AccountType =
  | "Depository"
  | "Investment"
  | "Retirement"
  | "Credit"
  | "Loan"
  | "Other";

export interface Assets {
  name: string;
  annual_growth_rate: number;
  shares?: number;
  amount?: number;
  security_id: string;
  account_id: string;
  projection: number;
  type: AccountType;
}

export interface ProjectedAssetsCardProps<TFieldValues extends FieldValues> {
  assets: Assets[];
  selectedYear: number;
}

export interface ProjectedAssetsContainerProps {
  assets: Assets[];
  children: React.ReactNode;
}

