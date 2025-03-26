// React
import React, {useRef} from "react";

// External Library
import { FieldValues } from "react-hook-form";

// Types
import { ProjectedAssetsCardProps } from "@/features/projected-financial-assets/types/projectedAssetsCard";

// Containers
import ProjectedAssetsContainer from "@/features/projected-financial-assets/components/containers/ProjectedAssetsContainer";

// Components
import PrimarySubmitButton from "@/components/buttons/PrimarySubmitButtonV2";
import AssetsTable from "@/features/projected-financial-assets/components/tables/AssetsTable";
import { ProjectedHoldingCardPrimaryHeader } from "@/features/projected-financial-assets/components/headers/ProjectedAssetsCardHeader";
import NoAssetsTable from "@/features/projected-financial-assets/components/tables/NoAssetsTable";

//test
const ProjectedAssetsCard = <TFieldValues extends FieldValues>({
  assets,
  selectedYear,
  form,
  isLoading,
}: ProjectedAssetsCardProps<TFieldValues>) => {
  const buttonRef = useRef<HTMLButtonElement>(null);
  return (
    <ProjectedAssetsContainer assets={assets}>
      <div className="grid grid-rows-[4rem_1fr_6rem] absolute w-full text-[#343a40] h-full">
        <ProjectedHoldingCardPrimaryHeader year={selectedYear} />
        <AssetsTable assets={assets} form={form} />
        <div className="flex justify-center  items-center">
          <PrimarySubmitButton text={"Update"} className="w-[8rem] font-semibold text-sm h-[3rem]" ref={buttonRef} isLoading={isLoading}/>
        </div>
        {/* If there are not assets */}
        {assets?.length === 0 && <NoAssetsTable />}
      </div>
    </ProjectedAssetsContainer>
  );
};

export default ProjectedAssetsCard;
