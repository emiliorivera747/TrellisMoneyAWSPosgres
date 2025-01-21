"use client";

//React
import React, { useState, useEffect } from "react";

//Components
import SignOutButton from "@/features/auth/components/buttons/SignOutButton";
import ProjectedNetWorthGraph from "@/features/projected-net-worth/components/projected-networth-graph/ProjectedNetWorthGraph";
import ProjectedAssetsCard from "@/features/projected-financial-assets/components/ProjectedAssetsCard";
import Link from "@/components/Plaid/Link";

// External Libraries
import { useQuery } from "@tanstack/react-query";

// API
import { fetchFinancialAssets } from "@/features/projected-financial-assets/utils/fetchFinancialAssets";

// Types
import { InflationFilters } from "@/features/projected-net-worth/types/filters";
import { Assets } from "@/features/projected-financial-assets/types/projectedAssetsCard";

//Hooks
import useAssets from "@/utils/hooks/apis/useAssets";

const currentYear = Number(new Date().getFullYear().toString());

const Dashboard = () => {

  // States
  const [selectedYear, setSelectedYear] = useState<number>(currentYear + 40);
  const [filteredAssets, setFilteredAssets] = useState<Assets[]>([]);
  const [selectedFilter, setSelectedFilter] =
    useState<InflationFilters>("isNoInflation");

  const { financialAssetsData, financialAssetsError } = useAssets(
    currentYear,
    selectedYear,
    selectedFilter
  );

  useEffect(() => {
    const sortedAssets = financialAssetsData?.data?.sort(
      (a, b) => b.projection - a.projection
    );
    setFilteredAssets(sortedAssets);
  }, [financialAssetsData]);

  const [linkToken, setLinkToken] = useState(null);
  const [numberOfYears, setNumberOfYears] = useState<Number>(40);

  const generateToken = async () => {
    const response = await fetch("/api/plaid/create-link-token", {
      method: "POST",
    });
    const data = await response.json();
    setLinkToken(data.link_token);
  };

  useEffect(() => {
    generateToken();
  }, []);

  const handleYearSelection = (year: number) => {
    setSelectedYear(year);
  };

  const handleFilterChange = (filter: InflationFilters) => {
    setSelectedFilter(filter);
  };

  return (
    <div className="min-h-screen h-auto w-full border-box">
      <div className="grid-cols-10 grid-rows-1 grid gap-6 p-4 mt-[2%] ">
        <div className="col-span-10 sm:col-span-7 overflow-y-auto h-screen no-scrollbar">
          <ProjectedNetWorthGraph
            handleYearSelection={handleYearSelection}
            selectedYear={selectedYear}
            selectedFilter={selectedFilter}
            handleFilterChange={handleFilterChange}
          />
        </div>
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
