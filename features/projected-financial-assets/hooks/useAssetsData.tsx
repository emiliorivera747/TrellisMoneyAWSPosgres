import { useDashboardContext } from "@/context/dashboard/DashboardProvider";

export const useAssetsData = () => {
  const { futureProjectionData } = useDashboardContext();
  return futureProjectionData?.projected_assets?.[0]?.data || [];
};