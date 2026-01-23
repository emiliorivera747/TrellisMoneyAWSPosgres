import { useMutation, useQueryClient } from "@tanstack/react-query";
import accountsService from "@/services/accounts/accountsServices";
import { useToast } from "@/hooks/toast/use-toast";

/**
 * Hook to refresh household accounts and refetch any related data
 *
 * @returns Mutation functions and states for refreshing accounts
 */
const useRefreshAccounts = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const {
    mutate: refreshAccounts,
    isPending: isLoadingRefresh,
    isError: isErrorRefresh,
    error: refreshError,
    isSuccess: isSuccessRefresh,
    isIdle,
    mutateAsync: refreshAccountsAsync,
    reset,
  } = useMutation({
    mutationFn: accountsService.refreshAccounts,
    onMutate: () => {
      toast({
        title: "Accounts",
        description: "Refreshing account data...",
        variant: "default",
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["accounts"],
      });
      queryClient.invalidateQueries({
        queryKey: ["household"],
      });
      toast({
        title: "Accounts",
        description: "Successfully refreshed account data",
        variant: "success",
      });
    },
    onError: (error) => {
      toast({
        variant: "destructive",
        title: "Something went wrong when refreshing accounts",
        description:
          error instanceof Error
            ? error.message
            : "An unexpected error occurred. Please try again.",
      });
    },
    retry: 1,
  });

  return {
    refreshAccounts,
    isLoadingRefresh,
    isErrorRefresh,
    refreshError,
    isSuccessRefresh,
    isIdle,
    reset,
    refreshAccountsAsync,
  };
};

export default useRefreshAccounts;
