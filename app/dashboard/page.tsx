"use client";

//React
import React, { useState } from "react";

// External Library
import { FieldValues } from "react-hook-form";
import { useForm, SubmitHandler } from "react-hook-form";

//Components
import SignOutButton from "@/features/auth/components/buttons/SignOutButton";
import ProjectedNetWorthGraph from "@/features/projected-net-worth/components/projected-networth-graph/ProjectedNetWorthGraph";
import ProjectedAssetsCard from "@/features/projected-financial-assets/components/ProjectedAssetsCard";
import Link from "@/components/Plaid/Link";
import LoadingToast from "@/components/toast/LoadingToast";
import ProjectedAssetsCardSkeleton from "@/features/projected-financial-assets/components/skeleton/ProjectedAssetsCardSkeleton";

//Sections
import PrimaryDashboardSection from "@/components/dashboard/PrimaryDashboardSection";

// Types
import { InflationFilters } from "@/features/projected-net-worth/types/filters";

//Hooks
import useAssets from "@/utils/hooks/react-query/useAssets";
import useSortAssets from "@/utils/hooks/financial-assets/useSortAssets";
import useGenerateToken from "@/utils/hooks/plaid/useGenerateToken";
import useUpdateAssets from "@/utils/hooks/financial-assets/useUpdateAssets";
import useFetchUser from "@/utils/hooks/user/useFetchUser";

//Shadcn
import { Form } from "@/components/ui/form";

//Functions
import updateAssets from "@/features/projected-financial-assets/utils/updateAssets";
import mutateAllAssets from "@/features/projected-financial-assets/utils/mutateAllAssets";

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
   * Retrieve Assests
   */
  const { financialAssetsData, financialAssetsError, isPendingAssets } =
    useAssets(currentYear, selectedYear, selectedFilter);

  const form = useForm();
  const { mutate, isPending } = useUpdateAssets();
  const { user, error } = useFetchUser();

  /**
   * Filter Assets
   */
  const filteredAssets = useSortAssets(financialAssetsData);

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
  interface FormData extends FieldValues {
    // Define the structure of your form data here
  }

  /**
   *
   * Update annual return rate
   *
   * @param data
   */
  const onSubmit: SubmitHandler<FormData> = (data) => {
    const updatedAssets = updateAssets(filteredAssets, data, user);
    mutateAllAssets(updatedAssets, mutate);
  };

  return (
    <div className="min-h-screen h-auto w-full border-box">
      <div className="grid-cols-10 grid-rows-1 grid gap-6 p-4 mt-[2%]">
        {/* Dashboard Prominent Section */}
        <PrimaryDashboardSection>
          <ProjectedNetWorthGraph
            handleYearSelection={handleYearSelection}
            selectedYear={selectedYear}
            selectedFilter={selectedFilter}
            handleFilterChange={handleFilterChange}
          />
          {/* <TestForm/> */}
        </PrimaryDashboardSection>

        {/* Seconday Section */}
        <Form {...form}>
          <form
            className="grid grid-rows-[1fr_6rem] gap-6 h-full col-span-10 sm:col-span-3 sm:row-span-1"
            onSubmit={form.handleSubmit(onSubmit)}
          >
            {isPendingAssets ? (
              <ProjectedAssetsCardSkeleton />
            ) : (
              <ProjectedAssetsCard
                assets={filteredAssets ? filteredAssets : []}
                selectedYear={selectedYear}
                form={form}
                isLoading={isPending}
              />
            )}
          </form>
        </Form>
        {linkToken != null ? <Link linkToken={linkToken} /> : <></>}
        <SignOutButton />
      </div>
    </div>
  );
};

export default Dashboard;
