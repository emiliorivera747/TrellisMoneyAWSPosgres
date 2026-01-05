//Functions
import updateAssets from "@/features/projected-financial-assets/utils/updateAssets";
import { ProjectedAssets } from "@/features/projected-financial-assets/types/projectedAssets";
import { FutureProjectionData } from "@/types/futureProjections";
import useFetchProjections from "@/hooks/financial-projections/useFetchProjections";
import { useDashboardFilters } from "@/stores/slices/dashboard/dashboardFilters.selectors";
import useUpdateAssets from "@/hooks/financial-assets/useUpdateAssets";
import useFetchUser from "@/hooks/user/useFetchUser";

/**
 * Handles form submission to update the annual return rate.
 *
 * @param data - Form data submitted by the user.
 * @param projectionData - Data related to projected assets.
 * @param selectedFilter - Currently selected filter.
 * @param user - Current user information.
 * @param mutateAssets - Function to mutate asset data.
 * @param mutateAccount - Function to mutate account data.
 */
export const handleFormSubmission = (data: Record<string, number>) => {
  const { selectedYear, selectedFilter } = useDashboardFilters();
  const { futureProjectionData: projectionData } = useFetchProjections({
    selectedYear,
    selectedFilter,
  });
  const { user } = useFetchUser();
  const { mutateAssets } = useUpdateAssets();

  if (!projectionData) return;
  const currentProjectedAsset =
    getCurrentProjectedAsset(projectionData, selectedFilter) ||
    projectionData.projected_assets[0];

  if (!currentProjectedAsset) return;

  const updatedAssets = updateAssets(currentProjectedAsset?.data, data, user);
  if (updatedAssets) mutateAssets(updatedAssets);
};

/**
 * Returns the current projected asset.
 *
 * @param projectionData - Data related to projected assets.
 * @param selectedFilter - Currently selected filter.
 */
const getCurrentProjectedAsset = (
  projectionData: FutureProjectionData | undefined | null,
  selectedFilter: string
) => {
  return projectionData?.projected_assets?.find(
    (payload: ProjectedAssets) => payload.value === selectedFilter
  );
};
