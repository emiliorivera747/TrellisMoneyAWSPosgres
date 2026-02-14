import { useQuery } from "@tanstack/react-query";
import { holdingService } from "@/services/holdings/holdingsService";

/**
 * Fetches holding history data for a specific security using React Query.
 *
 * @param {string} securityId - The security ID to fetch history for.
 * @returns {object} - Data, loading, and error states.
 */
const useFetchHoldingHistory = (securityId: string) => {
  const {
    data: historyData,
    isError: historyHasError,
    error: historyError,
    isLoading: historyLoading,
  } = useQuery({
    queryKey: ["holding-history", securityId],
    queryFn: () => holdingService.getHoldingHistory(securityId),
    staleTime: 5 * 60 * 1000,
    gcTime: 30 * 60 * 1000,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    enabled: !!securityId,
  });

  return { historyData, historyError, historyLoading, historyHasError };
};

export default useFetchHoldingHistory;
