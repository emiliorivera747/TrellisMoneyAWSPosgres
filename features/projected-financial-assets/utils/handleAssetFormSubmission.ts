//Functions
import updateAssets from "@/features/projected-financial-assets/utils/updateAssets";
import { ProjectedAssetsWithFilter, FutureProjectionData } from "@/types/future-projections/futureProjections";
import { User } from "@supabase/supabase-js";

interface HandleFormSubmissionParams {
  data: Record<string, number>;
  projectionData: FutureProjectionData | undefined | null;
  selectedFilter: string;
  user: User | undefined | null;
  mutateAssets: (assets: any) => void;
}

/**
 * Handles form submission to update the annual return rate.
 *
 * @param params - Parameters for form submission.
 * @param params.data - Form data submitted by the user.
 * @param params.projectionData - Data related to projected assets.
 * @param params.selectedFilter - Currently selected filter.
 * @param params.user - Current user information.
 * @param params.mutateAssets - Function to mutate asset data.
 */
export const handleFormSubmission = ({
  data,
  projectionData,
  selectedFilter,
  user,
  mutateAssets,
}: HandleFormSubmissionParams) => {
  if (!projectionData) return;
  const currentProjectedAsset =
    getCurrentProjectedAsset(projectionData, selectedFilter) ||
    projectionData.projectedAssets[0];

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
  return projectionData?.projectedAssets?.find(
    (payload: ProjectedAssetsWithFilter) => payload.filterValue === selectedFilter
  );
};
