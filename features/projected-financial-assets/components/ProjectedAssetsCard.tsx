// Containers
import ProjectedAssetsContainer from "@/features/projected-financial-assets/components/containers/ProjectedAssetsContainer";

// Components
import AssetsTable from "@/features/projected-financial-assets/components/tables/AssetsTable";
import { AssetsCardPrimaryHeader } from "@/features/projected-financial-assets/components/headers/ProjectedAssetsCardHeader";
import NoAssetsTable from "@/features/projected-financial-assets/components/tables/NoAssetsTable";
import ProjectedAssetsCardSkeleton from "@/features/projected-financial-assets/components/skeleton/ProjectedAssetsCardSkeleton";
import UpdateButton from "@/features/projected-financial-assets/components/buttons/UpdateButton";
import AssetErrors from "@/features/projected-financial-assets/components/errors/AssetErrors";

// Context hook
import useFetchProjections from "@/hooks/financial-projections/useFetchProjections";
import { useDashboardFilters } from "@/stores/slices/dashboardFilters.selectors";
import useUpdateAssets from "@/hooks/financial-assets/useUpdateAssets";


/**
 *
 * Displays the projected assets card showing the projected year, asset groups, and assets.
 *
 * @param param0
 * @returns projected assets card
 */
const ProjectedAssetsCard = () => {
  const { selectedYear, selectedFilter, mode } = useDashboardFilters();
  const { isLoadingAssets, isErrorAssets, assetError } = useUpdateAssets();

  const { assets, futureProjectionLoading } = useFetchProjections({
    selectedYear,
    selectedFilter,
  });

  if (isErrorAssets) return <AssetErrors error={assetError} />;

  if (isLoadingAssets || futureProjectionLoading)
    return <ProjectedAssetsCardSkeleton />;

  return (
    <ProjectedAssetsContainer assets={assets}>
      <div
        className={`grid no-scrollbars rounded-[12px] pb-6 border border-tertiary-400 ${
          mode === "edit" ? "grid-rows-[4rem_1fr_6rem]" : "grid-rows-[4rem_1fr]"
        } absolute w-full text-[#343a40] h-auto max-h-[90vh] overflow-y-hidden`}
      >
        <AssetsCardPrimaryHeader />
        <AssetsTable />
        <UpdateButton />
        {assets?.length === 0 && <NoAssetsTable />}
      </div>
    </ProjectedAssetsContainer>
  );
};

export default ProjectedAssetsCard;
