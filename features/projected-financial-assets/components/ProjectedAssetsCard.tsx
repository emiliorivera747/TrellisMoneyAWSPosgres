import React, { useState } from "react";

//External Library
import { FieldValues } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";

// Types
import { ProjectedAssetsCardProps } from "@/features/projected-financial-assets/types/projectedAssetsCard";
import { HoldingId } from "@/types/plaid";

//Containers
import ProjectedAssetsContainer from "@/features/projected-financial-assets/components/containers/ProjectedAssetsContainer";

//Components
import ProjectedAssetsTableHeader from "@/features/projected-financial-assets/components/table-headers/ProjectedAssetsTableHeader";
import TableBodyForAssets from "@/features/projected-financial-assets/components/table-body/TableBodyForAssets";
import PrimarySubmitButton from "@/components/buttons/PrimarySubmitButton";

import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";

import {
  ProjectedHoldingCardHeader,
  ProjectedHoldingCardPrimaryHeader,
} from "@/features/projected-financial-assets/components/headers/ProjectedAssetsCardHeader";
import NoAssets from "@/features/projected-financial-assets/components/NoAssets";

import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  annualGrowthRateSchema,
  AnnualGrowthRate,
} from "@/features/projected-financial-assets/schemas/formSchemas";

import assetService from "@/services/assets/assetsServices";

// Hooks
import useFetchUser from "@/utils/hooks/user/useFetchUser";

const ProjectedAssetsCard = <TFieldValues extends FieldValues>({
  assets,
  selectedYear,
}: ProjectedAssetsCardProps<TFieldValues>) => {
  const {
    register,
    formState: { errors },
    setError,
    handleSubmit,
  } = useForm();

  const queryClient = useQueryClient();

  const { user, error } = useFetchUser();


  const { mutate } = useMutation({
    mutationFn: assetService.updateUserAssets,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["projectedNetWorth"] });
      queryClient.invalidateQueries({ queryKey: ["financialAssets"] });
    },
  });

  const onSubmit: SubmitHandler<AnnualGrowthRate> = (data) => {
    const updatedAssets = assets.map((asset) => {
      const growthRate = data[asset.name];
      return {
        ...asset,
        user_id: user?.id ?? "",
        annual_growth_rate:
          growthRate !== undefined
            ? growthRate / 100
            : asset.annual_growth_rate,
      };
    });
    updatedAssets.forEach((asset) => {
      mutate(asset);
    });
  };

  return (
    <ProjectedAssetsContainer assets={assets}>
      <div className="flex flex-col gap-1 absolute overflow-hidden w-full text-[#343a40]">
        <ProjectedHoldingCardPrimaryHeader year={selectedYear} />
        <form
          className="flex flex-col items-center gap-6"
          onSubmit={handleSubmit(onSubmit)}
        >
          <Table>
            <ProjectedAssetsTableHeader />
            <TableBodyForAssets
              assets={assets}
              fieldName={"annualGrowthRate"}
              errors={errors}
              register={register}
            />
          </Table>
          <PrimarySubmitButton text={"Calculate"} w={"w-[8rem]"} />
        </form>

        {/* If there are not assets */}
        {assets?.length === 0 && (
          <Table>
            <NoAssets />
          </Table>
        )}
      </div>
    </ProjectedAssetsContainer>
  );
};

export default ProjectedAssetsCard;
