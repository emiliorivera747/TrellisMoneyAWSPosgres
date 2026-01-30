import { useQuery } from "@tanstack/react-query";
import { accountServices } from "@/features/accounts/services/accountServices";
import { ApiResponse } from "@/types/services/responses/api-responses";

/**
 * Custom hook to fetch accounts data using react-query.
 */
export const useFetchAccounts = () => {
  const {
    data: accountsResponse,
    error: accountsError,
    isLoading: isLoadingAccounts,
    isError: isErrorAccounts,
  } = useQuery({
    queryKey: ["accounts"],
    queryFn: () => accountServices.fetchAccounts(),
    enabled: true,
    refetchOnWindowFocus: false,
    retry: 1,
  });

  return {
    accountsResponse,
    accountsError,
    isLoadingAccounts,
    isErrorAccounts,
  };
};
