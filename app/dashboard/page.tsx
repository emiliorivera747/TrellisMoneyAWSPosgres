"use client";
import React, { useState, useEffect } from "react";

//Components
import SignOutButton from "@/features/auth/components/buttons/SignOutButton";
import DeleteUserButton from "@/features/auth/components/buttons/DeleteUserButton";
import ProjectedNetWorthGraph from "@/components/dashboard/ProjectedNetWorthGraph";
import ProjectedHoldingsCard from "@/components/dashboard/ProjectedHoldingsCard";
import Link from "@/components/plaid/Link";

import { createClient } from "@/utils/supabase/client";

// services
import plaidService from "@/features/plaid/services/plaidServices";
import financialProjectionService from "@/features/plaid/financial-projections/financialProjectionService";

// External Libraries
import { useQuery } from "@tanstack/react-query";

const Dashboard = () => {
  const client = createClient();
  useEffect(() => {
    const fetchUser = async () => {
      const { data: user, error } = await client.auth.getUser();
      if (error) {
        console.error("Error fetching user:", error);
      } else {
        console.log("User data:", user);
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
  // console.log("Identity Data ", identityData);
  // console.log("Holdings Data ", holdingsData);
  // // console.log("Account Data ", accountData);
  // console.log("Balance Data ", balanceData);

  return (
    <div className="min-h-screen h-auto w-full border-box">
      <div className="grid-cols-10 grid-rows-1 grid gap-6 p-4 mt-[2%] ">
        <div className="col-span-10 sm:col-span-7 overflow-y-auto h-screen no-scrollbar">
          <ProjectedNetWorthGraph />

          {/* <p className="text-tertiary-1000 font-semibold mt-4 mx-4">
            Net Worth: $
            {netWorthData?.netWorth ? netWorthData.netWorth : "None"}
          </p> */}
          {/* <p>Identity Data: {JSON.stringify(identityData, null, 2)}</p> */}
          {/* <p>Holdings Data: {JSON.stringify(holdingsData, null, 2)}</p> */}
          {/* <p>Account Data: {JSON.stringify(accountData)}</p> */}
          {/* <p>Balance Data: {JSON.stringify(balanceData, null, 2)}</p> */}
        </div>
        <ProjectedHoldingsCard holdings={[]} numberOfYears={numberOfYears} />
        {linkToken != null ? <Link linkToken={linkToken} /> : <></>}
        <SignOutButton />
      </div>
    </div>
  );
};

export default Dashboard;
