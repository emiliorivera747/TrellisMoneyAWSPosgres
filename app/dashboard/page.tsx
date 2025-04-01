"use client";

//React
import React from "react";

//Components
import ProjectedNetWorthGraph from "@/features/projected-net-worth/components/projected-networth-graph/ProjectedNetWorthGraph";
import Link from "@/components/Plaid/Link";
import AssetsForm from "@/features/projected-financial-assets/components/AssetFrom";
import NetWorthCard from "@/features/net-worth/components/NetWorthCard";
import KeyStatContainer from "@/features/key-statistics/components/KeyStatContainer";

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
    mode,
    handleModeChange,
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
          <div className="grid grid-cols-2 gap-4">
            <NetWorthCard />
            <NetWorthCard />
          </div>

          <KeyStatContainer />
        </PrimaryDashboardSection>
        {/* Assets Form Section */}
        <AssetsForm
          form={form}
          assets={getAssetsData()}
          selectedYear={selectedYear}
          isLoading={projectionLoading}
          onSubmit={onSubmit}
          mode={mode}
          handleModeChange={handleModeChange}
        />
        {/* {linkToken != null ? <Link linkToken={linkToken} /> : <></>} */}
      </div>
    </div>
  );
};

export default Dashboard;
