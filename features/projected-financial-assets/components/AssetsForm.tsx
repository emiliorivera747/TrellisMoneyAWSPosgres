"use client";
import { Form } from "@/components/ui/form";
import { SubmitHandler } from "react-hook-form";
import ProjectedAssetsCard from "@/features/projected-financial-assets/components/ProjectedAssetsCard";
import { useDashboardContext } from "@/context/dashboard/DashboardProvider";

//Functions
import updateAssets from "@/features/projected-financial-assets/utils/updateAssets";
import { ProjectedAssets } from "@/features/projected-financial-assets/types/projectedAssets";
import { FutureProjectionData } from "@/types/futureProjections";
import useUpdateAssets from "@/hooks/financial-assets/useUpdateAssets";
import useFetchUser from "@/hooks/user/useFetchUser";

import { useDashboardFiltersWithActions } from "@/stores/slices/dashboardFilters.selectors";

/**
 *
 * AssetsForm component is in charge of rendering the form for the projected assets.
 *
 * @param param0
const AssetsCard: React.FC<AssetsFormProps> = ({ form, onSubmit }) => {
 */
const AssetsCard = ({
  futureProjectionData,
  selectedFilter,
  selectedYear,
}: {
  futureProjectionData: any;
  selectedFilter: any;
  selectedYear: any;
}) => {
  const { form } = useDashboardContext();
  const { user } = useFetchUser();
  const { mutateAssets } = useUpdateAssets();
  const { setMode } = useDashboardFiltersWithActions();

  /**
   *
   * Updates Assets
   *
   * @param data
   * @returns
   */
  const onSubmit: SubmitHandler<unknown> = (data) => {
    const formData = data as Record<string, number>;

    if (!futureProjectionData) return;
    const currentProjectedAsset =
      getCurrentProjectedAsset(futureProjectionData, selectedFilter) ||
      futureProjectionData.projected_assets[0];

    if (!currentProjectedAsset) return;
    const updatedAssets = updateAssets(
      currentProjectedAsset?.data,
      formData,
      user
    );
    if (updatedAssets) {
      mutateAssets(updatedAssets);
      setMode("view");
    }
  };

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
 * @param futureProjectionData - Data related to projected assets.
 * @param selectedFilter - Currently selected filter.
 */
const getCurrentProjectedAsset = (
  futureProjectionData: FutureProjectionData | undefined | null,
  selectedFilter: string
) => {
  return futureProjectionData?.projected_assets?.find(
    (payload: ProjectedAssets) => payload.value === selectedFilter
  );
};
