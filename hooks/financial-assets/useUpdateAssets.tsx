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
  } = useMutation({
    mutationFn: assetService.updateAllAssets,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["projectedAssetsAndNetworth"],
      });
      toast({
        title: "Projections",
        description: "Successfully updated assets",
        variant: "success",
      });
    },
    onError: () => {
      toast({
        variant: "destructive",
        title: "Something went wrong when upating Projections",
      });
    },
  });
  return { mutateAssets, isLoadingAssets, isErrorAssets, assetError};
};

export default useUpdateAssets;
