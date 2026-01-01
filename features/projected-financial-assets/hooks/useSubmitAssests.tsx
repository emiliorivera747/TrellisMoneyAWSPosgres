import { useCallback } from "react";
import { SubmitHandler } from "react-hook-form";
import updateAssets from "@/features/projected-financial-assets/utils/updateAssets";
import useUpdateAssets from "@/hooks/financial-assets/useUpdateAssets";
import useFetchUser from "@/hooks/user/useFetchUser";

// Types
import { FutureProjectionData } from "../types/projectedAssets";
import { ProjectedAssets } from "@/types/futureProjections";

// Selectors
import { useDashboardFiltersWithActions } from "@/stores/slices/dashboardFilters.selectors";

import { FormData } from "@/hooks/dashboard/useDashboard";

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
  selectedFilter,
}: {
  futureProjectionData?: FutureProjectionData | null;
  selectedFilter: string;
}) => {
  const { mutateAssets, isLoadingAssets, isErrorAssets, assetError } =
    useUpdateAssets();
  const { user } = useFetchUser();
  const { setMode } = useDashboardFiltersWithActions();

  const onSubmit = useCallback<SubmitHandler<FormData>>(
    (data) => {
      if (!futureProjectionData || !user) return;

      const currentAssetGroup = getCurrentProjectedAsset(
        futureProjectionData,
        selectedFilter
      );
      if (!currentAssetGroup?.data) return;

      const updatedAssets = updateAssets(
        currentAssetGroup?.data,
        data as Record<string, number>,
        user
      );

      if (!updatedAssets) return;

      mutateAssets(updatedAssets);
      setMode("view");
    },
    [futureProjectionData, selectedFilter, user, mutateAssets, setMode]
  );
  return { onSubmit, isLoadingAssets, isErrorAssets, assetError };
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
  const assets = futureProjectionData?.projected_assets?.find(
    (payload: ProjectedAssets) => payload.value === selectedFilter
  );
  if (assets) return assets;

  return futureProjectionData?.projected_assets[0];
};
