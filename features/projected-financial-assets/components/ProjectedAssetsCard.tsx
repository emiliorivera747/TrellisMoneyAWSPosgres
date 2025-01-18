import React from "react";

import { FieldValues } from "react-hook-form";

// Types
import { ProjectedAssetsCardProps } from "@/features/projected-financial-assets/types/projectedAssetsCard";

//Containers
import ProjectedAssetsContainer from "@/features/projected-financial-assets/components/containers/ProjectedAssetsContainer";

//Components
import ProjectedAssetsTableHeader from "@/features/projected-financial-assets/components/table-headers/ProjectedAssetsTableHeader";
import TableBodyForAssets from "@/features/projected-financial-assets/components/table-body/TableBodyForAssets";

import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";

import {
  ProjectedHoldingCardHeader,
  ProjectedHoldingCardPrimaryHeader,
} from "@/features/projected-financial-assets/components/headers/ProjectedAssetsCardHeader";
import NoAssets from "@/features/projected-financial-assets/components/NoAssets";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { annualGrowthRateSchema, AnnualGrowthRate } from "@/features/projected-financial-assets/schemas/formSchemas";


const ProjectedAssetsCard = <TFieldValues extends FieldValues>({
  assets,
  selectedYear,
}: ProjectedAssetsCardProps<TFieldValues>) => {
  const {
    register,
    formState: { errors },
    setError,
  } = useForm<AnnualGrowthRate>({
    resolver: zodResolver(annualGrowthRateSchema),
  });
  return (
    <ProjectedAssetsContainer assets={assets}>
      <div className="flex flex-col gap-1 absolute overflow-hidden w-full text-[#343a40]">
        <ProjectedHoldingCardPrimaryHeader year={selectedYear} />
        <Table>
          <ProjectedAssetsTableHeader />
          <TableBodyForAssets
            assets={assets}
            fieldName={"annualGrowthRate"}
            errors={errors}
            register={register}
            // defaultValue={10}
          />
        </Table>
        {/* If there are not assets */}
        {assets?.length === 0 && <NoAssets />}
      </div>
    </ProjectedAssetsContainer>
  );
};

export default ProjectedAssetsCard;
