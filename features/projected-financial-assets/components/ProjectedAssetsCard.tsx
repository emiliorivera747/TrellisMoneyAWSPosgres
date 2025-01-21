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

const ProjectedAssetsCard = <TFieldValues extends FieldValues>({
  assets,
  selectedYear,
}: ProjectedAssetsCardProps<TFieldValues>) => {
  const {
    register,
    formState: { errors },
    setError,
    handleSubmit,
  } = useForm<AnnualGrowthRate>();

  const { user, error } = useFetchUser();

  const { mutate } = useUpdateAssets();

  const onSubmit: SubmitHandler<AnnualGrowthRate> = (data) => {
    const updatedAssets = updateAssets(assets, data, user);
    mutateAllAssets(updatedAssets, mutate);
  };

  return (
    <ProjectedAssetsContainer assets={assets}>
      <div className="flex flex-col gap-1 absolute overflow-hidden w-full text-[#343a40]">
        <ProjectedHoldingCardPrimaryHeader year={selectedYear} />
        <form
          className="flex flex-col items-center gap-6"
          onSubmit={handleSubmit(onSubmit)}
        >
          <AssetsTable
            assets={assets}
            fieldName={"annualGrowthRate"}
            errors={errors}
            register={register}
          />
          <PrimarySubmitButton text={"Calculate"} w={"w-[8rem]"} />
        </form>

        {/* If there are not assets */}
        {assets?.length === 0 && <NoAssetsTable />}
      </div>
    </ProjectedAssetsContainer>
  );
};

export default ProjectedAssetsCard;
