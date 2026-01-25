import { useCallback } from "react";
import { SubmitHandler } from "react-hook-form";
import updateAssets from "@/features/projected-financial-assets/utils/updateAssets";
import useUpdateAssets from "@/hooks/financial-assets/useUpdateAssets";
import useFetchUser from "@/hooks/user/useFetchUser";

// Types
import { FutureProjectionData } from "@/types/future-projections/futureProjections";
import { FormData } from "@/types/components/admin/dashboard/dashboard";
import { InflationFilters } from "@/features/projected-net-worth/types/filters";

// Selectors
import { useDashboardFiltersWithActions } from "@/stores/slices/dashboard/dashboardFilters.selectors";

/**
 * Custom hook `useSubmitAssests` for handling the submission of projected financial assets.
 *
 * @param {Object} params - The parameters for the hook.
 * @param {FutureProjectionData | null} [params.futureProjectionData] - The future projection data used to determine the current asset group.
 * @param {string} params.selectedFilter - The selected filter to identify the relevant asset group.
 *
 * @returns {Object} - Returns an object containing:
 * - `onSubmit` (SubmitHandler<Record<string, number>>): A callback function to handle the submission of updated assets.
 * - `isLoadingAssets` (boolean): Indicates whether the asset update operation is currently loading.
 * - `isErrorAssets` (boolean): Indicates whether there was an error during the asset update operation.
 * - `assetError` (any): The error object, if any, encountered during the asset update operation.
 *
 * @description
 * This hook is responsible for managing the submission of updated projected financial assets.
 * It uses the `useUpdateAssets` hook to perform the mutation of assets and the `useFetchUser` hook
 * to retrieve the current user. The `useDashboardFiltersWithActions` hook is used to manage the dashboard mode.
 *
 * The `onSubmit` function:
 * - Validates the presence of `futureProjectionData` and `user`.
 * - Retrieves the current asset group based on the `selectedFilter`.
 * - Updates the assets using the provided data and the current user.
 * - Calls the `mutateAssets` function to submit the updated assets.
 * - Sets the dashboard mode to "view" upon successful submission.
 *
 * Dependencies:
 * - `futureProjectionData`, `selectedFilter`, `user`, `mutateAssets`, and `setMode` are memoized
 *   to ensure the `onSubmit` function is stable and does not cause unnecessary re-renders.
 */
const useSubmitAssests = ({
  futureProjectionData,
  selectedInflationFilter,
  onSuccess,
}: {
  futureProjectionData: FutureProjectionData | undefined | Error;
  selectedInflationFilter: InflationFilters;
  onSuccess?: () => void;
}) => {
  const {
    mutateAssetsAsync,
    isLoadingAssets,
    isErrorAssets,
    assetError,
    isSuccessAssets,
  } = useUpdateAssets();

  const { user } = useFetchUser();
  const { setMode } = useDashboardFiltersWithActions();

  const onSubmit = useCallback<SubmitHandler<FormData>>(
    async (data) => {
      if (!futureProjectionData || futureProjectionData instanceof Error || !user) return;

      const currentAssetGroup = getCurrentProjectedAsset(
        futureProjectionData,
        selectedInflationFilter
      );

      if (!currentAssetGroup?.data) return;
      const updatedAssets = updateAssets(currentAssetGroup?.data, data, user);
      if (!updatedAssets) return;

      // Mutate, Set Mode, and onSuccess function
      try {
        await mutateAssetsAsync(updatedAssets);
        setMode("view");
        onSuccess?.();
      } catch (err) {
        console.error("Asset update failed:", err);
      }
    },
    [
      futureProjectionData,
      selectedInflationFilter,
      user,
      mutateAssetsAsync,
      setMode,
      onSuccess,
    ]
  );
  return {
    onSubmit,
    isLoadingAssets,
    isErrorAssets,
    assetError,
    isSuccessAssets,
  };
};

export default useSubmitAssests;

/**
 * Returns the current projected asset.
 *
 * @param futureProjectionData - Data related to projected assets.
 * @param selectedFilter - Currently selected filter.
 */
const getCurrentProjectedAsset = (
  futureProjectionData: FutureProjectionData | undefined | null,
  selectedFilter: string
) => {
  const assets = futureProjectionData?.projectedAssets?.find(
    (payload) => payload.value === selectedFilter
  );
  if (assets) return assets;
  return futureProjectionData?.projectedAssets[0];
};
