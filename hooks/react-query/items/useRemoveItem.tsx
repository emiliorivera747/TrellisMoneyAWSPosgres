import { useMutation, useQueryClient } from "@tanstack/react-query";
import itemService from "@/services/items/itemsServices";
import { useToast } from "@/hooks/toast/use-toast";

/**
 * Custom hook to fetch accounts data using react-query.
 *
 * @returns {Object} - An object containing accounts data, loading state, and error state.
 */
export const useRemoveItem = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const {
    mutate: mutateItem,
    isPending: itemIsPending,
    isError: itemHasError,
    error: itemError
  } = useMutation({
    mutationFn: itemService.removeItem,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["accounts"] });
      toast({
        title: "Connection",
        description: "Successfully deleted connection",
        variant: "success",
      });
    },
    onError: () => {
      toast({
        variant: "destructive",
        title: "Something went wrong when deleting the connection",
      });
    },
  });

  return { mutateItem, itemIsPending, itemHasError, itemError};
};
