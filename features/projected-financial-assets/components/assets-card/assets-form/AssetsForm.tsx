"use client";
import { Form } from "@/components/ui/form";
import { useAssetsFormContext } from "@/context/dashboard/AssetsDashboardProvider";
import ProjectedAssetsCard from "@/features/projected-financial-assets/components/assets-card/layout/ProjectedAssetsCard";

// Functions
import useSubmitAssests from "@/features/projected-financial-assets/hooks/useSubmitAssests";

// Type
import { ProjectedAssetCardFormProps } from "@/features/projected-financial-assets/types/projectedAssetsCard";

/**
 *
 * AssetsForm component is in charge of rendering the form for the projected assets.
 *
 */
const AssetsCard = ({
  futureProjectionData,
  selectedInflationFilter,
}: ProjectedAssetCardFormProps) => {
  
  const { form, resetForm } = useAssetsFormContext();

  const { onSubmit } = useSubmitAssests({
    futureProjectionData,
    selectedInflationFilter,
    onSuccess: resetForm,
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
