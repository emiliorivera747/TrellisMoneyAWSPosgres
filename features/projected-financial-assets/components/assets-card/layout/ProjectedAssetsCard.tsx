// Containers
import ProjectedAssetsContainer from "@/features/projected-financial-assets/components/containers/ProjectedAssetsContainer";

// Components
import AssetsTable from "@/features/projected-financial-assets/components/assets-card/tables/AssetsTable";
import { AssetsCardPrimaryHeader } from "@/features/projected-financial-assets/components/headers/ProjectedAssetsCardHeader";
import NoAssetsTable from "@/features/projected-financial-assets/components/assets-card/tables/NoAssetsTable";
import ProjectedAssetsCardSkeleton from "@/features/projected-financial-assets/components/skeleton/ProjectedAssetsCardSkeleton";
import UpdateButton from "@/features/projected-financial-assets/components/buttons/UpdateButton";
import AssetErrors from "@/features/projected-financial-assets/components/errors/AssetErrors";

// Layout
import AssetsGridLayout from "@/features/projected-financial-assets/components/assets-card/layout/AssetsGridLayout";

// Context hook
import useFetchProjections from "@/hooks/financial-projections/useFetchProjections";
import { useDashboardFilters } from "@/stores/slices/dashboard/dashboardFilters.selectors";
import useUpdateAssets from "@/hooks/financial-assets/useUpdateAssets";

/**
 *
 * Displays the projected assets card showing the projected year, asset groups, and assets.
 *
 * @param param0
 * @returns projected assets card
 */
const ProjectedAssetsCard = () => {
  const { mode } = useDashboardFilters();
  const { isLoadingAssets, isErrorAssets, assetError } = useUpdateAssets();
  const { futureProjectionLoading } = useFetchProjections();
  
  if (isErrorAssets) return <AssetErrors error={assetError} />;
  if (isLoadingAssets || futureProjectionLoading)
    return <ProjectedAssetsCardSkeleton />;

  return (
    <ProjectedAssetsContainer assets={assets}>
      <AssetsGridLayout mode={mode}>
        <AssetsCardPrimaryHeader />
        <AssetsTable />
        <UpdateButton />
        {assets?.length === 0 && <NoAssetsTable />}
      </AssetsGridLayout>
    </ProjectedAssetsContainer>
  );
};

export default ProjectedAssetsCard;
