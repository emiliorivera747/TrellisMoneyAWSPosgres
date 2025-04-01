"use client";

//React
import React from "react";

//Components
import ProjectedNetWorthGraph from "@/features/projected-net-worth/components/projected-networth-graph/ProjectedNetWorthGraph";
import ProjectedAssetsCard from "@/features/projected-financial-assets/components/ProjectedAssetsCard";
import Link from "@/components/Plaid/Link";
import AssetsForm from "@/features/projected-financial-assets/components/AssetFrom";

//Sections
import PrimaryDashboardSection from "@/components/dashboard/PrimaryDashboardSection";

//Hooks
import { useDashboard } from "@/utils/hooks/dashboard/useDashboard";

/**
 *
 * Dashboard page is in charge of retrieving all of the financial data and displaying sending the
 * data to a variety of components.
 *
 *
 * @returns
 */
const Dashboard = () => {
  const {
    selectedYear,
    selectedFilter,
    projectionData,
    projectionError,
    projectionLoading,
    linkToken,
    form,
    handleYearSelection,
    handleFilterChange,
    onSubmit,
  } = useDashboard();

  const getAssetsData = () => projectionData?.projected_assets[0]?.data || [];

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
            projectionData={projectionData?.projected_net_worth}
            projectionError={projectionError}
            projectionLoading={projectionLoading}
          />
        </PrimaryDashboardSection>
        {/* Assets Form Section */}
        <AssetsForm
          form={form}
          assets={getAssetsData()}
          selectedYear={selectedYear}
          isLoading={projectionLoading}
          onSubmit={onSubmit}
        />
        {linkToken != null ? <Link linkToken={linkToken} /> : <></>}
      </div>
    </div>
  );
};

export default Dashboard;
