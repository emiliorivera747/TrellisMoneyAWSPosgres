import { useQuery } from "@tanstack/react-query";
import { fetchProjections } from "@/features/projected-net-worth/utils/fetchProjectionData";

interface useFetchProjectionsProps {
  selectedYear: number;
  selectedFilter: string;
}

const currentYear = Number(new Date().getFullYear().toString());
/**
 * Custom hook to fetch financial projections based on the selected year and filter.
 *
 * @param {Object} params - The parameters for fetching projections.
 * @param {number} params.selectedYear - The year for which projections are to be fetched.
 * @param {string} params.selectedFilter - The filter criteria for the projections.
 *
 * @returns {Object} An object containing the following:
 * - `futureProjectionData`: The fetched projection data.
 * - `futureProjectionError`: Any error encountered during the fetch operation.
 * - `futureProjectionLoading`: A boolean indicating whether the fetch operation is in progress.
 *
 * @example
 * const { futureProjectionData, futureProjectionError, futureProjectionLoading } = useFetchProjections({
 *   selectedYear: 2023,
 *   selectedFilter: "networth",
 * });
 */
const useFetchProjections = ({
  selectedYear,
  selectedFilter,
}: useFetchProjectionsProps) => {
  const {
    data: futureProjectionData,
    error: futureProjectionError,
    isLoading: futureProjectionLoading,
    isError: futureProjectionHasError,
  } = useQuery({
    queryKey: [
      "projectedAssetsAndNetworth",
      currentYear,
      selectedYear,
      selectedFilter,
    ],
    queryFn: () =>
      fetchProjections(
        Number(currentYear),
        Number(selectedYear),
        selectedFilter
      ),
    enabled: !!selectedYear,
  });

  return {
    futureProjectionData,
    futureProjectionError,
    futureProjectionLoading,
    futureProjectionHasError,
  };
};

export default useFetchProjections;
