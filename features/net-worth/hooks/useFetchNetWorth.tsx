// External Libraries
import { useQuery } from "@tanstack/react-query";

// Services
import { networthService } from "@/features/net-worth/services/networthService";

/**
 * Custom hook to fetch net worth data.
 * Utilizes React Query for data fetching and caching.
 *
 * @returns {object} - Contains net worth data, error, and loading state.
 */
export const useFetchNetWorth = () => {
  const {
    data: netWorthData,
    isError: netWorthHasError,
    error: netWorthError,
    isLoading: netWorthLoading,
  } = useQuery({
    queryKey: ["netWorth"],
    queryFn: networthService.getNetWorth,
    staleTime: 5 * 60 * 1000,         // 5 minutes 
    gcTime: 30 * 60 * 1000,           // 30 minutes 
    refetchOnMount: false,            
    refetchOnWindowFocus: false,      
  });
  return { netWorthData, netWorthError, netWorthLoading, netWorthHasError };
};
