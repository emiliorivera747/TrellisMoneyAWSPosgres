import { FutureProjectionData } from "@/types/futureProjections";

export const getAssets = (
  futureProjectionData: FutureProjectionData | undefined
) => futureProjectionData?.projected_assets?.[0]?.data;
