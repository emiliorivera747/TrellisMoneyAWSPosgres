import { useDashboardContext } from "@/context/dashboard/DashboardProvider";

export const useAssetsData = () => {
  const { projectionData } = useDashboardContext();
  return projectionData?.projected_assets?.[0]?.data || [];
};