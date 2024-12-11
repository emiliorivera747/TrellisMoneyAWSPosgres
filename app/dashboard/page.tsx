"use client";
import React, { useState, useEffect } from "react";

//Components
import SignOutButton from "@/features/auth/components/buttons/SignOutButton";
import DeleteUserButton from "@/features/auth/components/buttons/DeleteUserButton";
import ProjectedNetWorthGraph from "@/components/dashboard/ProjectedNetWorthGraph";
import ProjectedHoldingsCard from "@/components/dashboard/ProjectedHoldingsCard";
import Link from "@/components/Plaid/Link";

// services
import plaidService from "@/features/plaid/services/plaidServices";

// External Libraries
import {
  useQuery
} from "@tanstack/react-query";

const Dashboard = () => {
  // Access the client
  const { data: identityData, error: identityError } = useQuery({
    queryKey: ["identity"],
    queryFn: plaidService.getIdentity,
  });

  const { data: holdingsData,error: holdingError } = useQuery({
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
  console.log("Identity Data ", identityData);
  console.log("Holdings Data ", holdingsData);
  // console.log("Account Data ", accountData);
  console.log("Balance Data ", balanceData);
  

  return (
    <div className="min-h-screen h-auto w-full border-box">
      <div className="grid-cols-10 grid-rows-1 grid gap-6 p-4 mt-[2%] ">
        <div className="col-span-10 sm:col-span-7 overflow-y-auto h-screen no-scrollbar">
          <ProjectedNetWorthGraph />
        </div>
        <ProjectedHoldingsCard
          holdings={[]}
          numberOfYears={numberOfYears}
        />
        {linkToken != null ? <Link linkToken={linkToken} /> : <></>}
        <SignOutButton />
        <p>Identity Data: {JSON.stringify(identityData)}</p>
        <p>Holdings Data: {JSON.stringify(holdingsData)}</p>
        {/* <p>Account Data: {JSON.stringify(accountData)}</p> */}
        <p>Balance Data: {JSON.stringify(balanceData)}</p>
        <p>Identity Error: {JSON.stringify(identityError)}</p>
        <p>Holdings Error: {JSON.stringify(holdingError)}</p>
        <p>Balance Error: {JSON.stringify(balanceError)}</p>
        {/* <DeleteUserButton /> */}
      </div>
    </div>
  );
};

export default Dashboard;
