import { FutureProjectionData } from "@/types/futureProjections";

export const getAssets = (
  futureProjectionData: FutureProjectionData | undefined
) => {
  return futureProjectionData?.projected_assets?.[0]?.data || [];
};
