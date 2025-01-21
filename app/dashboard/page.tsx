"use client";

//React
import React, { useState } from "react";

//Components
import SignOutButton from "@/features/auth/components/buttons/SignOutButton";
import ProjectedNetWorthGraph from "@/features/projected-net-worth/components/projected-networth-graph/ProjectedNetWorthGraph";
import ProjectedAssetsCard from "@/features/projected-financial-assets/components/ProjectedAssetsCard";
import Link from "@/components/Plaid/Link";

//Sections
import PrimaryDashboardSection from "@/components/dashboard/PrimaryDashboardSection";

// Types
import { InflationFilters } from "@/features/projected-net-worth/types/filters";

//Hooks
import useAssets from "@/utils/hooks/react-query/useAssets";
import useSortAssets from "@/utils/hooks/financial-assets/useSortAssets";
import useGenerateToken from "@/utils/hooks/plaid/useGenerateToken";

const currentYear = Number(new Date().getFullYear().toString());

const Dashboard = () => {
  const [selectedYear, setSelectedYear] = useState<number>(currentYear + 40);
  const [selectedFilter, setSelectedFilter] =
    useState<InflationFilters>("isNoInflation");

  /**
   * Retrieve Assests
   */
  const { financialAssetsData, financialAssetsError } = useAssets(
    currentYear,
    selectedYear,
    selectedFilter
  );

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

  return (
    <div className="min-h-screen h-auto w-full border-box">
      <div className="grid-cols-10 grid-rows-1 grid gap-6 p-4 mt-[2%]">

        <PrimaryDashboardSection>
          <ProjectedNetWorthGraph
            handleYearSelection={handleYearSelection}
            selectedYear={selectedYear}
            selectedFilter={selectedFilter}
            handleFilterChange={handleFilterChange}
          />
        </PrimaryDashboardSection>

        <ProjectedAssetsCard
          assets={filteredAssets ? filteredAssets : []}
          selectedYear={selectedYear}
        />

        {linkToken != null ? <Link linkToken={linkToken} /> : <></>}

        <SignOutButton />
      </div>
    </div>
  );
};

export default Dashboard;
