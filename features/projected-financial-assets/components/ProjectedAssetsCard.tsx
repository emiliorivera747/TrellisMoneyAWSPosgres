// React
import React, { useRef, useState } from "react";

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
import ProjectedAssetsCardSkeleton from "@/features/projected-financial-assets/components/skeleton/ProjectedAssetsCardSkeleton";

/**
 *
 * Displays the projected assets card showing the projected year, asset groups, and assets.
 *
 * @param param0
 * @returns projected assets card
 */
const ProjectedAssetsCard = <TFieldValues extends FieldValues>({
  assets,
  selectedYear,
  form,
  isLoading,
  mode,
  handleModeChange,
}: ProjectedAssetsCardProps<TFieldValues>) => {
  const buttonRef = useRef<HTMLButtonElement>(null);


  if (isLoading) return <ProjectedAssetsCardSkeleton />;
  return (
    <ProjectedAssetsContainer assets={assets}>
      <div
        className={`grid ${
          mode === "edit" ? "grid-rows-[4rem_1fr_6rem]" : "grid-rows-[4rem_1fr]"
        } absolute w-full text-[#343a40] h-full`}
      >
        <ProjectedHoldingCardPrimaryHeader
          year={selectedYear}
          mode={mode}
          setMode={handleModeChange}
        />
        <AssetsTable assets={assets} form={form} mode={mode} />
        {mode === "edit" && (
          <div className="flex justify-center  items-center">
            <PrimarySubmitButton
              text={"Update"}
              className="w-[8rem] font-semibold text-sm h-[3rem]"
              ref={buttonRef}
              isLoading={isLoading}
            />
          </div>
        )}
        {/* If there are not assets */}
        {assets?.length === 0 && <NoAssetsTable />}
      </div>
    </ProjectedAssetsContainer>
  );
};

export default ProjectedAssetsCard;
