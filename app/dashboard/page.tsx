"use client";
import React, { useState, useEffect } from "react";

//Components
import SignOutButton from "@/features/auth/components/buttons/SignOutButton";
import ProjectedNetWorthGraph from "@/features/projected-net-worth/components/projected-networth-graph/ProjectedNetWorthGraph";
// import ProjectedHoldingsCard from "@/features/projected-net-worth/components/projected-holdings/ProjectedHoldingsCard";
import ProjectedAssetsCard from "@/features/projected-financial-assets/components/ProjectedAssetsCard";
import Link from "@/components/Plaid/Link";

import { createClient } from "@/utils/supabase/client";

// services
import plaidService from "@/features/plaid/services/plaidServices";

// External Libraries
import { useQuery } from "@tanstack/react-query";

const currentYear = Number(new Date().getFullYear().toString());

const Dashboard = () => {
  const [selectedYear, setSelectedYear] = useState(currentYear + 40);

  const client = createClient();
  useEffect(() => {
    const fetchUser = async () => {
      const { data: user, error } = await client.auth.getUser();
      if (error) {
        console.error("Error fetching user:", error);
      } else {
        //("User data:", user);
      }
    };
    fetchUser();
  }, []);

  // Access the client
  const { data: identityData, error: identityError } = useQuery({
    queryKey: ["identity"],
    queryFn: plaidService.getIdentity,
  });

  const { data: holdingsData, error: holdingError } = useQuery({
    queryKey: ["holdings"],
    queryFn: plaidService.getHoldings,
  });

  // const { data: accountData } = useQuery({
  //   queryKey: ["account"],
  //   queryFn: plaidService.getAccount,
  // });

  const { data: balanceData, error: balanceError } = useQuery({
    queryKey: ["balance"],
    queryFn: plaidService.getBalance,
  });

  const { data: netWorthData, error: netWorthError } = useQuery({
    queryKey: ["netWorth"],
    queryFn: plaidService.getNetWorth,
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
          assets={[
            {
              name: "TSLA",
              annual_growth_rate: 0.2,
              shares: 30,
              projection: 10000,
              security_id: "1",
              account_id: "1",
              type: "Investment",
            },
          ]}
          selectedYear={selectedYear}
        />
        {/* <ProjectedHoldingsCard holdings={[{asset_name:"TSLA", annual_growth_rate:"0.2", projection:"1000", }]} numberOfYears={numberOfYears} /> */}
        {linkToken != null ? <Link linkToken={linkToken} /> : <></>}
        <SignOutButton />
      </div>
    </div>
  );
};

export default Dashboard;
