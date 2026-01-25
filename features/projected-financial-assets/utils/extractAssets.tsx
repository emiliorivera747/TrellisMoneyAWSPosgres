import { FutureProjectionData } from "@/types/future-projections/futureProjections";

export const getAssets = (
  futureProjectionData: FutureProjectionData | undefined
) => futureProjectionData?.projectedAssets?.[0]?.data;
