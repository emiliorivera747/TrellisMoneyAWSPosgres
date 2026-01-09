import { FutureProjectionData } from "@/types/future-projections/futureProjections";

export const getAssets = (
  futureProjectionData: FutureProjectionData | undefined
) => futureProjectionData?.projected_assets?.[0]?.data;
