"use client";

//React
import React, { useState } from "react";

// External Library
import { useForm, SubmitHandler } from "react-hook-form";
import { FieldValues } from "react-hook-form";

//Components
import ProjectedNetWorthGraph from "@/features/projected-net-worth/components/projected-networth-graph/ProjectedNetWorthGraph";
import ProjectedAssetsCard from "@/features/projected-financial-assets/components/ProjectedAssetsCard";
import Link from "@/components/Plaid/Link";
import ProjectedAssetsCardSkeleton from "@/features/projected-financial-assets/components/skeleton/ProjectedAssetsCardSkeleton";
import ProjectedNetWorthGraphSkeleton from "@/components/skeletons/dashboard/ProjectedNetWorthGraphSkeleton";

//Sections
import PrimaryDashboardSection from "@/components/dashboard/PrimaryDashboardSection";

// Types
import { InflationFilters } from "@/features/projected-net-worth/types/filters";

//Hooks
import useGenerateToken from "@/utils/hooks/plaid/useGenerateToken";
import useUpdateAssets from "@/utils/hooks/financial-assets/useUpdateAssets";
import useFetchUser from "@/utils/hooks/user/useFetchUser";
import useFetchProjections from "@/utils/hooks/financial-projections/useFetchProjections";

//Shadcn
import { Form } from "@/components/ui/form";

//Functions
import mutateAllAssets from "@/features/projected-financial-assets/utils/mutateAllAssets";
import { extractAllAssetsFromAssetWithType } from "@/utils/helper-functions/extractAllAssetsFromAssetsWithType";
import updateAssets from "@/features/projected-financial-assets/utils/updateAssets";
const currentYear = Number(new Date().getFullYear().toString());

/**
 *
 * Dashboard page is in charge of retrieving all of the financial data and displaying sending the
 * data to a variety of components.
 *
 *
 * @returns
 */
const Dashboard = () => {
  const [selectedYear, setSelectedYear] = useState<number>(currentYear + 40);
  const [selectedFilter, setSelectedFilter] =
    useState<InflationFilters>("isNoInflation");

  /**
   *  The hook fetches our projection data
   */
  const { projectionData, projectionError, projectionLoading } =
    useFetchProjections({ selectedYear, selectedFilter });

  const form = useForm();

  /**
   * The hook updates the assets
   */
  const { mutate, isPending } = useUpdateAssets();

  /**
   * The hook fetches the user
   */
  const { user, error } = useFetchUser();

  /**
   * Generate Plaid link token
   */
  const linkToken = useGenerateToken();

  const handleYearSelection = (year: number) => {
    setSelectedYear(year);
  };

  const handleFilterChange = (filter: InflationFilters) => {
    setSelectedFilter(filter);
  };

  interface FormData extends FieldValues {}

  /**
   *
   * Update annual return rate
   *
   * @param data
   */
  const onSubmit: SubmitHandler<FormData> = (data) => {
    const projectedAssets = projectionData?.projected_assets;

    const currentProjectedAsset = projectedAssets?.filter(
      (payload) => payload.value === selectedFilter
    );

    const assets =
      currentProjectedAsset && currentProjectedAsset.length > 0
        ? extractAllAssetsFromAssetWithType(currentProjectedAsset[0].data)
        : [];

    const updatedAssets = updateAssets(assets, data, user);
    if (updatedAssets) mutateAllAssets(updatedAssets, mutate);
  };

  return (
    <div className="min-h-screen h-auto w-full border-box">
      <div className="grid-cols-10 grid-rows-1 grid gap-6 p-4 mt-[2%]">
        {/* Dashboard Prominent Section */}
        <PrimaryDashboardSection>
          {isPending ? (
            <ProjectedNetWorthGraphSkeleton />
          ) : (
            <ProjectedNetWorthGraph
              handleYearSelection={handleYearSelection}
              selectedYear={selectedYear}
              selectedFilter={selectedFilter}
              handleFilterChange={handleFilterChange}
              projectionData={projectionData?.projected_net_worth}
              projectionError={projectionError}
              projectionLoading={projectionLoading}
            />
          )}
        </PrimaryDashboardSection>
        {/* Seconday Section */}
        <Form {...form}>
          <form
            className="grid grid-rows-[1fr_6rem] gap-6 h-full col-span-10 sm:col-span-3 sm:row-span-1"
            onSubmit={form.handleSubmit(onSubmit)}
          >
            {projectionLoading ? (
              <ProjectedAssetsCardSkeleton />
            ) : (
              <ProjectedAssetsCard
                assets={
                  selectedFilter === "isBoth"
                    ? projectionData?.projected_assets[0]?.data
                    : projectionData?.projected_assets[0]?.data
                }
                selectedYear={selectedYear}
                form={form}
                isLoading={isPending}
              />
            )}
          </form>
        </Form>
        {linkToken != null ? <Link linkToken={linkToken} /> : <></>}
      </div>
    </div>
  );
};

export default Dashboard;
