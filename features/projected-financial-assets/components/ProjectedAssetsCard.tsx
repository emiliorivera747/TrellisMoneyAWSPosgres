// React
import React from "react";

// External Library
import { FieldValues } from "react-hook-form";
import { useForm, SubmitHandler } from "react-hook-form";

// Types
import { ProjectedAssetsCardProps } from "@/features/projected-financial-assets/types/projectedAssetsCard";

// Containers
import ProjectedAssetsContainer from "@/features/projected-financial-assets/components/containers/ProjectedAssetsContainer";

// Components
import PrimarySubmitButton from "@/components/buttons/PrimarySubmitButtonV2";
import AssetsTable from "@/features/projected-financial-assets/components/tables/AssetsTable";
import { ProjectedHoldingCardPrimaryHeader } from "@/features/projected-financial-assets/components/headers/ProjectedAssetsCardHeader";
import NoAssetsTable from "@/features/projected-financial-assets/components/tables/NoAssetsTable";


const ProjectedAssetsCard = <TFieldValues extends FieldValues>({
  assets,
  selectedYear,
  form,
}: ProjectedAssetsCardProps<TFieldValues>) => {

  return (
    <ProjectedAssetsContainer assets={assets}>
      <div className="grid grid-rows-[4rem_1fr_6rem] absolute w-full text-[#343a40] h-full">
        <ProjectedHoldingCardPrimaryHeader year={selectedYear} />

        <AssetsTable assets={assets} form={form} />

        <div className="flex justify-center">
          <PrimarySubmitButton text={"Calculate"} className="w-[8rem]" />
        </div>

        {/* If there are not assets */}
        {assets?.length === 0 && <NoAssetsTable />}
      </div>
    </ProjectedAssetsContainer>
  );
};

export default ProjectedAssetsCard;
