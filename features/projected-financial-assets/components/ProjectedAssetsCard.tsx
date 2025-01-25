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
import PrimarySubmitButton from "@/components/buttons/PrimarySubmitButtonV2";
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
      <div className="grid grid-rows-[4rem_1fr] absolute overflow-hidden w-full text-[#343a40] h-full">
        <ProjectedHoldingCardPrimaryHeader year={selectedYear} />
        <Form {...form}>
            <form
            className="grid grid-rows-[1fr_6rem] gap-6 h-full"
            onSubmit={form.handleSubmit(onSubmit)}
            >
            <AssetsTable assets={assets} form={form} />
            
            <div className="flex justify-center">
              <PrimarySubmitButton text={"Calculate"} className="w-[8rem]" />
            </div>
            </form>
        </Form>

        {/* If there are not assets */}
        {assets?.length === 0 && <NoAssetsTable />}
      </div>
    </ProjectedAssetsContainer>
  );
};

export default ProjectedAssetsCard;
