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
    queryKey: ["holdings"],
    queryFn: holdingService.getHoldings,
    staleTime: 5 * 60 * 1000,
    gcTime: 30 * 60 * 1000,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });
  return { holdingsData, holdingsError, holdingsLoading, holdingsHasError };
};

export default useFetchHoldings;
