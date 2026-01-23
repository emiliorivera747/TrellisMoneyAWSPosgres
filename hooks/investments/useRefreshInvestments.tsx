import { useMutation, useQueryClient } from "@tanstack/react-query";
import investmentsService from "@/services/investments/investmentsServices";
import { useToast } from "@/hooks/toast/use-toast";

/**
 * Hook to refresh investment account holdings and refetch any related data
 *
 * @returns Mutation functions and states for refreshing investments
 */
const useRefreshInvestments = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const {
    mutate: refreshInvestments,
    isPending: isLoadingRefresh,
    isError: isErrorRefresh,
    error: refreshError,
    isSuccess: isSuccessRefresh,
    isIdle,
    mutateAsync: refreshInvestmentsAsync,
    reset,
  } = useMutation({
    mutationFn: investmentsService.refreshInvestments,
    onMutate: () => {
      toast({
        title: "Investments",
        description: "Refreshing investment data...",
        variant: "default",
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["investments"],
      });
      queryClient.invalidateQueries({
        queryKey: ["holdings"],
      });
      toast({
        title: "Investments",
        description: "Successfully refreshed investment data",
        variant: "success",
      });
    },
    onError: (error) => {
      toast({
        variant: "destructive",
        title: "Something went wrong when refreshing investments",
        description:
          error instanceof Error
            ? error.message
            : "An unexpected error occurred. Please try again.",
      });
    },
    retry: 1,
  });

  return {
    refreshInvestments,
    isLoadingRefresh,
    isErrorRefresh,
    refreshError,
    isSuccessRefresh,
    isIdle,
    reset,
    refreshInvestmentsAsync,
  };
};

export default useRefreshInvestments;
