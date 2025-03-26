import { useMutation, useQueryClient } from "@tanstack/react-query";
import assetService from "@/services/assets/assetsServices";
import { useToast } from "@/hooks/use-toast"

/**
 *
 * Upadtes the users asset and refetches any related data
 *
 * @returns
 */
const useUpdateAssets = () => {
  const { toast } = useToast()

  const queryClient = useQueryClient();
  const { mutate, isPending } = useMutation({
    mutationFn: assetService.updateUserAssets,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["projectedAssetsAndNetworth"] });
      toast({
        title: "Financial Projections",
        description: "Successfully updated assets",
        variant: "success",
      })
    },
    onError: ()=>{
      toast({
        variant: "destructive",
        title:"Something went wrong when upating Financial Projections"
      })
    }
  });
  return { mutate , isPending};
};

export default useUpdateAssets;
