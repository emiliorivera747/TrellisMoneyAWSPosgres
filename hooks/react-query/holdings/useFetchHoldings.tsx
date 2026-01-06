import { useQuery } from "@tanstack/react-query";
import { holdingService } from "@/services/holdings/holdingsService";

/**
 * Fetches net worth data using React Query.
 *
 * @returns {object} - Data, loading, and error states.
 */
const useFetchHoldings = () => {
  const {
    data: holdingsData,
    isError: holdingsHasError,
    error: holdingsError,
    isLoading: holdingsLoading,
  } = useQuery({
    queryKey: ["holdigns"],
    queryFn: holdingService.getHoldings,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 30 * 60 * 1000, // 30 minutes
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });
  return { holdingsData, holdingsError, holdingsLoading, holdingsHasError };
};

export default useFetchHoldings;
