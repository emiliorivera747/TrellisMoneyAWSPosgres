// React
import React from "react";

// External Library
import { FieldValues } from "react-hook-form";
import { useForm, SubmitHandler } from "react-hook-form";

// Types
import { ProjectedAssetsCardProps } from "@/features/projected-financial-assets/types/projectedAssetsCard";
import { AnnualGrowthRate } from "@/features/projected-financial-assets/schemas/formSchemas";

// Containers
import ProjectedAssetsContainer from "@/features/projected-financial-assets/components/containers/ProjectedAssetsContainer";

// Components
import PrimarySubmitButton from "@/components/buttons/PrimarySubmitButton";
import AssetsTable from "@/features/projected-financial-assets/components/tables/AssetsTable";
import { ProjectedHoldingCardPrimaryHeader } from "@/features/projected-financial-assets/components/headers/ProjectedAssetsCardHeader";
import NoAssetsTable from "@/features/projected-financial-assets/components/tables/NoAssetsTable";

// Hooks
import useFetchUser from "@/utils/hooks/user/useFetchUser";
import useUpdateAssets from "@/utils/hooks/financial-assets/useUpdateAssets";

// Funcitons
import updateAssets from "@/features/projected-financial-assets/utils/updateAssets";
import mutateAllAssets from "@/features/projected-financial-assets/utils/mutateAllAssets";
import { zodResolver } from "@hookform/resolvers/zod";

import * as z from "zod";

import { Form } from "@/components/ui/form";

const ProjectedAssetsCard = <TFieldValues extends FieldValues>({
  assets,
  selectedYear,
}: ProjectedAssetsCardProps<TFieldValues>) => {
  const form = useForm()
  const { user, error } = useFetchUser();

  const { mutate } = useUpdateAssets();

  interface FormData extends FieldValues {
    // Define the structure of your form data here
  }

  const onSubmit: SubmitHandler<FormData> = (data) => {
    console.log(data);
    const updatedAssets = updateAssets(assets, data, user);
    mutateAllAssets(updatedAssets, mutate);
  };

  return (
    <ProjectedAssetsContainer assets={assets}>
      <div className="flex flex-col gap-1 absolute overflow-hidden w-full text-[#343a40]">
        <ProjectedHoldingCardPrimaryHeader year={selectedYear} />
        <Form {...form}>
          <form
            className="flex flex-col items-center gap-6"
            onSubmit={form.handleSubmit(onSubmit)}
          >
            <AssetsTable assets={assets} form={form} />
            <PrimarySubmitButton text={"Calculate"} w={"w-[8rem]"} />
          </form>
        </Form>

        {/* If there are not assets */}
        {assets?.length === 0 && <NoAssetsTable />}
      </div>
    </ProjectedAssetsContainer>
  );
};

export default ProjectedAssetsCard;
