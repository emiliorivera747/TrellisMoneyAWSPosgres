import { useQuery } from "@tanstack/react-query";
import { networthService } from "@/features/net-worth/services/networthService";

/**
 * Custom hook to fetch historical net worth data.
 * Utilizes React Query for data fetching and caching.
 *
 * @returns {object} - Contains historical net worth data, error, and loading state.
 */
export const useFetchNetWorthHistory = () => {
  const {
    data: netWorthHistoryResponse,
    isError: netWorthHistoryHasError,
    error: netWorthHistoryError,
    isLoading: netWorthHistoryLoading,
  } = useQuery({
    queryKey: ["netWorthHistory"],
    queryFn: networthService.getNetWorthHistory,
    staleTime: 5 * 60 * 1000,
    gcTime: 30 * 60 * 1000,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });

  const netWorthHistoryData = netWorthHistoryResponse?.data?.history ?? [];

  return {
    netWorthHistoryData,
    netWorthHistoryError,
    netWorthHistoryLoading,
    netWorthHistoryHasError,
  };
};
