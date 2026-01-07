"use client";
import { Form } from "@/components/ui/form";
import ProjectedAssetsCard from "@/features/projected-financial-assets/components/ProjectedAssetsCard";
import { useAssetsFormContext } from "@/context/dashboard/AssetsDashboardProvider";

// Functions
import useSubmitAssests from "@/features/projected-financial-assets/hooks/useSubmitAssests";

// Type
import { InflationFilters } from "@/features/projected-net-worth/types/filters";

/**
 *
 * AssetsForm component is in charge of rendering the form for the projected assets.
 *
 */
const AssetsCard = ({
  futureProjectionData,
  selectedProjectionFilter,
}: {
  futureProjectionData: any;
  selectedProjectionFilter: InflationFilters;
}) => {
  const { form } = useAssetsFormContext();
  const { onSubmit } = useSubmitAssests({
    futureProjectionData,
    selectedProjectionFilter,
    onSuccess: () => form.reset(),
  });
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
