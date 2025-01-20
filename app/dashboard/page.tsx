"use client";
import React, { useState, useEffect } from "react";

// External Libraries
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

//Components
import SignOutButton from "@/features/auth/components/buttons/SignOutButton";
import ProjectedNetWorthGraph from "@/features/projected-net-worth/components/projected-networth-graph/ProjectedNetWorthGraph";
import ProjectedAssetsCard from "@/features/projected-financial-assets/components/ProjectedAssetsCard";
import Link from "@/components/Plaid/Link";

import { createClient } from "@/utils/supabase/client";

// services
import plaidService from "@/features/plaid/services/plaidServices";
import assetsService from "@/services/assetsService";

// External Libraries
import { useQuery } from "@tanstack/react-query";

// API
import { fetchFinancialAssets } from "@/features/projected-financial-assets/utils/fetchFinancialAssets";

// Hooks
import useFetchUser from "@/utils/hooks/useFetchUser";

const currentYear = Number(new Date().getFullYear().toString());

const Dashboard = () => {
  const [selectedYear, setSelectedYear] = useState(currentYear + 40);

  const { user, error } = useFetchUser();

  // const { data: netWorthData, error: netWorthError } = useQuery({
  //   queryKey: ["netWorth"],
  //   queryFn: plaidService.getNetWorth,
  // });

  const { data: financialAssetsData, error: financialAssetsError } = useQuery({
    queryKey: ["financialAssets"],
    queryFn: () =>
      fetchFinancialAssets(currentYear, selectedYear, "isNoInflation"),
  });

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

  return (
    <div className="min-h-screen h-auto w-full border-box">
      <div className="grid-cols-10 grid-rows-1 grid gap-6 p-4 mt-[2%] ">
        <div className="col-span-10 sm:col-span-7 overflow-y-auto h-screen no-scrollbar">
          <ProjectedNetWorthGraph
            handleYearSelection={handleYearSelection}
            selectedYear={selectedYear}
          />
        </div>
        <ProjectedAssetsCard
          assets={financialAssetsData ? financialAssetsData.data : []}
          selectedYear={selectedYear}
        />
        {linkToken != null ? <Link linkToken={linkToken} /> : <></>}
        <SignOutButton />
      </div>
    </div>
  );
};

export default Dashboard;
