import { InflationFilters } from "@/features/projected-net-worth/types/filters";
import { useForm} from "react-hook-form";
import { ProjectionData } from "@/features/projected-financial-assets/types/projectedAssets";
import { User } from "@/types/user";

export interface DashboardState {
  selectedYear: number;
  selectedFilter: InflationFilters;
  projectionData: ProjectionData | null | undefined; 
  projectionError: any;
  projectionLoading: boolean;
  user: User | null; 
  userError: any;
  linkToken: string | null;
  isPending: boolean;
  netWorthData: {data: {netWorth: number, assets: number, liabilities: number}} | null;,
  netWorthError: any,
  netWorthLoading: boolean;
  mode: "edit" | "view";
  handleModeChange: () => void;
  form: ReturnType<typeof useForm>;
  mutateAsset: (asset: any) => void;
}

export interface NetValueDisplayCardProps {
  title: string;
  linkLabel: string;
  linkUrl: string;
  primaryValue: number;
  secondaryValue: number;
  secondaryLabel: string;
  tertiaryLabel: string;
  tertiaryValue: number;
}
