import { useMutation, useQueryClient } from "@tanstack/react-query";
import assetService from "@/services/assets/assetsServices";
import { useToast } from "@/hooks/toast/use-toast";

/**
 *
 * Upadtes the users asset and refetches any related data
 *
 * @returns
 */
const useUpdateAssets = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const {
    mutate: mutateAssets,
    isPending: isLoadingAssets,
    isError: isErrorAssets,
    error: assetError,
    isSuccess: isSuccessAssets,
    isIdle,
    mutateAsync: mutateAssetsAsync,
    reset: reset,
  } = useMutation({
    mutationFn: assetService.updateAllAssets,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["projections"],
      });
      toast({
        title: "Projections",
        description: "Successfully updated assets",
        variant: "success",
      });
    },
    onError: (error) => {
      toast({
        variant: "destructive",
        title: "Something went wrong when upating Projections",
        description:
          error instanceof Error
            ? error.message
            : "An unexpected error occurred. Please try again.",
      });
    },
    retry: 1,
  });
  return {
    mutateAssets,
    isLoadingAssets,
    isErrorAssets,
    assetError,
    isSuccessAssets,
    isIdle,
    reset,
    mutateAssetsAsync,
  };
};

export default useUpdateAssets;
