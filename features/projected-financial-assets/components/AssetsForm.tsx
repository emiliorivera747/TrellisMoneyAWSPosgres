"use client";
import { Form } from "@/components/ui/form";
import { SubmitHandler } from "react-hook-form";
import ProjectedAssetsCard from "@/features/projected-financial-assets/components/ProjectedAssetsCard";
import { useDashboardContext } from "@/context/dashboard/DashboardProvider";

//Functions
import updateAssets from "@/features/projected-financial-assets/utils/updateAssets";
import { ProjectedAssets } from "@/features/projected-financial-assets/types/projectedAssets";
import { FutureProjectionData } from "@/types/futureProjections";
import useFetchProjections from "@/hooks/financial-projections/useFetchProjections";
import { useDashboardFilters } from "@/stores/slices/dashboardFilters.selectors";
import useUpdateAssets from "@/hooks/financial-assets/useUpdateAssets";
import useFetchUser from "@/hooks/user/useFetchUser";

/**
 *
 * AssetsForm component is in charge of rendering the form for the projected assets.
 *
 * @param param0
const AssetsCard: React.FC<AssetsFormProps> = ({ form, onSubmit }) => {
 */
const AssetsCard = () => {
  const { form } = useDashboardContext();
  const { selectedYear, selectedFilter } = useDashboardFilters();
  const { futureProjectionData: projectionData } = useFetchProjections({
    selectedYear,
    selectedFilter,
  });
  const { user } = useFetchUser();
  const { mutateAssets } = useUpdateAssets();

  const onSubmit: SubmitHandler<unknown> = (data) => {
    const formData = data as Record<string, number>;

    if (!projectionData) return;
    const currentProjectedAsset =
      getCurrentProjectedAsset(projectionData, selectedFilter) ||
      projectionData.projected_assets[0];
  
    if (!currentProjectedAsset) return;
    const updatedAssets = updateAssets(currentProjectedAsset?.data, formData, user);
    if (updatedAssets) mutateAssets(updatedAssets);
  }

  return (
    <Form {...form}>
      <form
        className="grid grid-rows-[1fr_6rem] gap-6 col-span-10 sm:col-span-3 sm:row-span-1 w-[23rem] border-box overflow-hidden"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <ProjectedAssetsCard />
      </form>
    </Form>
  );
};

export default AssetsCard;



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
