import { useMutation, useQueryClient } from "@tanstack/react-query";
import assetService from "@/services/assets/assetsServices";

/**
 *
 * Upadtes the users asset and refetches any related data
 *
 * @returns
 */
const useUpdateAssets = () => {
  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: assetService.updateUserAssets,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["projectedNetWorth"] });
      queryClient.invalidateQueries({ queryKey: ["financialAssets"] });
    },
  });
  return { mutate };
};

export default useUpdateAssets;
