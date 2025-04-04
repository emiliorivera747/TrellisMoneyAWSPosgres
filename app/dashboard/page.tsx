"use client";

//React
import React from "react";

//Components
import ProjectedNetWorthGraph from "@/features/projected-net-worth/components/projected-networth-graph/ProjectedNetWorthGraph";
import Link from "@/components/Plaid/Link";
import AssetsForm from "@/features/projected-financial-assets/components/AssetFrom";
import NetValueDisplay from "@/components/dashboard/NetValueDisplay";
import KeyStatContainer from "@/features/key-statistics/components/KeyStatContainer";
import Footer from "@/components/footers/Footer";

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
    netWorthData,
    netWorthError,
    netWorthLoading,
    handleModeChange,
    handleYearSelection,
    handleFilterChange,
    onSubmit,
  } = useDashboard();

  const getAssetsData = () => projectionData?.projected_assets[0]?.data || [];

  return (
    <div className="w-full border-box max-h-screen overflow-y-scroll flex flex-row">
      <div className="p-4 w-[70%] mt-[2%] max-h-screen">
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
          <div className="grid grid-cols-2 gap-4 border-b pb-8 border-tertiary-300">
            <NetValueDisplay
              title={"Net worth"}
              linkLabel="Accounts"
              linkUrl="/accounts"
              primaryValue={netWorthData?.data?.netWorth ?? 0}
              secondaryValue={netWorthData?.data?.assets ?? 0}
              tertiaryValue={netWorthData?.data?.liabilities ?? 0}
              secondaryLabel="Assets"
              tertiaryLabel="Liabilities"
            />
            <NetValueDisplay
              title={"Cash Flow"}
              linkLabel="Accounts"
              linkUrl="/accounts"
              primaryValue={10000}
              secondaryValue={20000}
              tertiaryValue={10000}
              secondaryLabel="All income"
              tertiaryLabel="All spending"
            />
          </div>
          <KeyStatContainer />
          <Footer />
        </PrimaryDashboardSection>
      </div>
      <div className="h-full w-[30%]  sticky top-0 pt-[2%]">
        <AssetsForm
          form={form}
          assets={getAssetsData()}
          selectedYear={selectedYear}
          isLoading={projectionLoading}
          onSubmit={onSubmit}
          mode={mode}
          handleModeChange={handleModeChange}
        />
      </div>
    </div>
  );
};

export default Dashboard;
