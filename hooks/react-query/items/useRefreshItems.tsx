import { useMutation, useQueryClient } from "@tanstack/react-query";
import itemService from "@/services/items/itemsServices";
import { useToast } from "@/hooks/toast/use-toast";

/**
 * Hook to refresh items and refetch any related data
 *
 * @returns Mutation functions and states for refreshing items
 */
const useRefreshItems = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const {
    mutate: refreshItems,
    isPending: isLoadingRefresh,
    isError: isErrorRefresh,
    error: refreshError,
    isSuccess: isSuccessRefresh,
    isIdle,
    mutateAsync: refreshItemsAsync,
    reset,
  } = useMutation({
    mutationFn: itemService.refreshItems,
    onMutate: () => {
      toast({
        title: "Items",
        description: "Refreshing items data...",
        variant: "default",
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["items"],
      });
      toast({
        title: "Items",
        description: "Successfully refreshed items data",
        variant: "success",
      });
    },
    onError: (error) => {
      toast({
        variant: "destructive",
        title: "Something went wrong when refreshing items",
        description:
          error instanceof Error
            ? error.message
            : "An unexpected error occurred. Please try again.",
      });
    },
    retry: 1,
  });

  return {
    refreshItems,
    isLoadingRefresh,
    isErrorRefresh,
    refreshError,
    isSuccessRefresh,
    isIdle,
    reset,
    refreshItemsAsync,
  };
};

export default useRefreshItems;
