import { useQuery } from "@tanstack/react-query";
import { accountServices } from "@/features/accounts/services/accountServices";

/**
 * Custom hook to fetch accounts data using react-query.
 *
 * @returns {Object} - An object containing accounts data, loading state, and error state.
 */
export const useFetchAccounts = () => {
  const {
    data: accountsResponse,
    isLoading: isLoadingAccounts,
    isError: isErrorAccounts,
  } = useQuery({
    queryKey: ["accounts"],
    queryFn: () => accountServices.fetchAccounts(),
    enabled: true,
    refetchOnWindowFocus: false,
    retry: 1,
  });

  return { accountsResponse, isLoadingAccounts, isErrorAccounts };
};
