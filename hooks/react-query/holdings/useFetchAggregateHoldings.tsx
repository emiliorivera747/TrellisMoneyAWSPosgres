import { useQuery } from "@tanstack/react-query";
import { holdingService } from "@/services/holdings/holdingsService";

/**
 * Fetches aggregate holdings data for a specific security using React Query.
 *
 * @param {string} securityId - The security ID to fetch aggregate holdings for.
 * @returns {object} - Data, loading, and error states.
 */
const useFetchAggregateHoldings = (securityId: string) => {
  const {
    data: aggregateData,
    isError: aggregateHasError,
    error: aggregateError,
    isLoading: aggregateLoading,
  } = useQuery({
    queryKey: ["aggregate-holdings", securityId],
    queryFn: () => holdingService.getAggregateHoldings(securityId),
    staleTime: 5 * 60 * 1000,
    gcTime: 30 * 60 * 1000,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    enabled: !!securityId,
  });

  return { aggregateData, aggregateError, aggregateLoading, aggregateHasError };
};

export default useFetchAggregateHoldings;
