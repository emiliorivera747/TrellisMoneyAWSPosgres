// React
import { useRef, Activity } from "react";

// Containers
import ProjectedAssetsContainer from "@/features/projected-financial-assets/components/containers/ProjectedAssetsContainer";

// Components
import PrimarySubmitButton from "@/components/buttons/PrimarySubmitButtonV2";
import AssetsTable from "@/features/projected-financial-assets/components/tables/AssetsTable";
import { AssetsCardPrimaryHeader } from "@/features/projected-financial-assets/components/headers/ProjectedAssetsCardHeader";
import NoAssetsTable from "@/features/projected-financial-assets/components/tables/NoAssetsTable";
import ProjectedAssetsCardSkeleton from "@/features/projected-financial-assets/components/skeleton/ProjectedAssetsCardSkeleton";

// Context hook
import { useDashboardContext } from "@/context/dashboard/DashboardProvider";
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
  const { mode, handleModeChange, assets } = useDashboardContext();
  const { selectedYear, selectedFilter } = useDashboardFilters();

  const { isLoadingAssets, isErrorAssets, assetError } = useUpdateAssets();

  const { futureProjectionLoading } = useFetchProjections({
    selectedYear,
    selectedFilter,
  });

  const buttonRef = useRef<HTMLButtonElement>(null);

  if (isErrorAssets)
    return (
      <div>There was an Error: {assetError?.message || "Unknown error"}</div>
    );
  if (isLoadingAssets || futureProjectionLoading)
    return <ProjectedAssetsCardSkeleton />;

  return (
    <ProjectedAssetsContainer assets={assets}>
      <div
        style={{
          border: "1px solid rgb(221, 221, 221)",
        }}
        className={`grid no-scrollbars rounded-[12px] pb-6 ${
          mode === "edit" ? "grid-rows-[4rem_1fr_6rem]" : "grid-rows-[4rem_1fr]"
        } absolute w-full text-[#343a40] h-auto max-h-[90vh] overflow-y-hidden`}
      >
        {/* Assets car header*/}
        <AssetsCardPrimaryHeader
          year={selectedYear}
          mode={mode}
          setMode={assets?.length > 0 ? handleModeChange : () => {}}
        />

        <AssetsTable />

        {/* Update button */}
        <Activity mode={mode === "edit" ? "visible" : "hidden"}>
          <div className="flex justify-center items-center">
            <PrimarySubmitButton
              text={"Update"}
              className="w-[8rem] font-semibold text-sm h-[3rem]"
              ref={buttonRef}
              isLoading={isLoadingAssets}
            />
          </div>
        </Activity>
        
        {/* If there are not assets */}
        {assets?.length === 0 && <NoAssetsTable />}
      </div>
    </ProjectedAssetsContainer>
  );
};

export default ProjectedAssetsCard;
