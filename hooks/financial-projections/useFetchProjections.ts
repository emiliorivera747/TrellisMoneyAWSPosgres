import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchProjections } from "@/features/projected-net-worth/utils/fetchProjectionData";
import { getAssets } from "@/features/projected-financial-assets/utils/extractAssets";
import { useDashboardFilters } from "@/stores/slices/dashboard/dashboardFilters.selectors";

const currentYear = Number(new Date().getFullYear().toString());
/**
 * Hook to fetch financial projections based on year and filter.
 *
 * @returns {Object} Contains projection data, error, and loading state.
 */
const useFetchProjections = () => {
  
  const { selectedProjectedYear, selectedInflationFilter } =
    useDashboardFilters();

  const {
    data: futureProjectionData,
    error: futureProjectionError,
    isLoading: futureProjectionLoading,
    isError: futureProjectionHasError,
  } = useQuery({
    queryKey: [
      "projections",
      selectedProjectedYear,
      selectedInflationFilter,
    ],
    queryFn: () =>
      fetchProjections(
        currentYear,
        selectedProjectedYear,
        selectedInflationFilter
      ),
    enabled: !!selectedProjectedYear,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 30 * 60 * 1000, // 30 minutes
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });

    const assets = useMemo(
    () => getAssets(futureProjectionData),
    [futureProjectionData]
  );

  return {
    assets,
    futureProjectionData,
    futureProjectionError,
    futureProjectionLoading,
    futureProjectionHasError,
  };
};

export default useFetchProjections;
