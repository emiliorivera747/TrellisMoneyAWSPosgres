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
  form: ReturnType<typeof useForm>;
  mutateAsset: (asset: any) => void;
  mutateAccount: (asset: any) => void;
}
