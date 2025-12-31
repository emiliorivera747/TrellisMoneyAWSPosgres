//Functions
import updateAssets from "@/features/projected-financial-assets/utils/updateAssets";
import { ProjectedAssets } from "@/features/projected-financial-assets/types/projectedAssets";
import { FutureProjectionData } from "@/types/futureProjections";

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
export const handleFormSubmission = (
  data: Record<string, number>,
  projectionData: FutureProjectionData | undefined | null,
  selectedFilter: string,
  user: any,
  mutate: (asset: any) => void
) => {
  if (!projectionData) return;

  console.log("data", data);
  console.log("projectionData", projectionData);

  const currentProjectedAsset =
    getCurrentProjectedAsset(projectionData, selectedFilter) ||
    projectionData.projected_assets[0];

  if (!currentProjectedAsset) return;

  const updatedAssets = updateAssets(currentProjectedAsset?.data, data, user);
  mutate(updatedAssets);
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
