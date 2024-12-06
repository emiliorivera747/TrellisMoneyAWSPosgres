"use client";
import React, { useState, useEffect } from "react";

//Components
import SignOutButton from "@/features/auth/components/buttons/SignOutButton";
import DeleteUserButton from "@/features/auth/components/buttons/DeleteUserButton";
import TopPageNav from "@/components/navigation/TopNavBar";
import ProjectedNetWorthGraph from "@/components/dashboard/ProjectedNetWorthGraph";
import ProjectedHoldingsCard from "@/components/dashboard/ProjectedHoldingsCard";
import { topNavigationBarData } from "@/utils/data/topNavigationBarData";
import Link from "@/components/Plaid/Link";

const stocks = [
  { symbol: "AAPL", amount: 150, yearlyPercentGrowth: -10, shares: 10 },
  { symbol: "GOOGL", amount: 120, yearlyPercentGrowth: 6, shares: 5 },
  { symbol: "AMZN", amount: 80, yearlyPercentGrowth: 7, shares: 2 },
  { symbol: "MSFT", amount: 200, yearlyPercentGrowth: 8, shares: 15 },
  { symbol: "TSLA", amount: 50, yearlyPercentGrowth: 9, shares: 1 },
  { symbol: "FB", amount: 90, yearlyPercentGrowth: 10, shares: 3 },
  { symbol: "NFLX", amount: 60, yearlyPercentGrowth: 11, shares: 4 },
  { symbol: "NVDA", amount: 70, yearlyPercentGrowth: 12, shares: 6 },
  { symbol: "BABA", amount: 40, yearlyPercentGrowth: 13, shares: 2 },
  { symbol: "V", amount: 110, yearlyPercentGrowth: 14, shares: 7 },
  { symbol: "JPM", amount: 130, yearlyPercentGrowth: 15, shares: 8 },
  { symbol: "DIS", amount: 100, yearlyPercentGrowth: 16, shares: 9 },
  { symbol: "PYPL", amount: 55, yearlyPercentGrowth: 17, shares: 3 },
  { symbol: "ADBE", amount: 65, yearlyPercentGrowth: 18, shares: 4 },
  { symbol: "INTC", amount: 75, yearlyPercentGrowth: 19, shares: 5 },
  { symbol: "CSCO", amount: 85, yearlyPercentGrowth: 20, shares: 6 },
  { symbol: "PEP", amount: 95, yearlyPercentGrowth: 21, shares: 7 },
  { symbol: "KO", amount: 105, yearlyPercentGrowth: 22, shares: 8 },
  { symbol: "NKE", amount: 115, yearlyPercentGrowth: 23, shares: 9 },
  { symbol: "PFE", amount: 125, yearlyPercentGrowth: 24, shares: 10 },
  { symbol: "MRK", amount: 135, yearlyPercentGrowth: 25, shares: 11 },
  { symbol: "T", amount: 145, yearlyPercentGrowth: 26, shares: 12 },
  { symbol: "VZ", amount: 155, yearlyPercentGrowth: 27, shares: 13 },
  { symbol: "WMT", amount: 165, yearlyPercentGrowth: 28, shares: 14 },
  { symbol: "HD", amount: 175, yearlyPercentGrowth: 29, shares: 15 },
  { symbol: "PG", amount: 185, yearlyPercentGrowth: 30, shares: 16 },
  { symbol: "BAC", amount: 195, yearlyPercentGrowth: 31, shares: 17 },
  { symbol: "XOM", amount: 205, yearlyPercentGrowth: 32, shares: 18 },
  { symbol: "CVX", amount: 215, yearlyPercentGrowth: 33, shares: 19 },
  { symbol: "UNH", amount: 225, yearlyPercentGrowth: 34, shares: 20 },
];

const cryptocurrencies = [
  { symbol: "BTC", amount: 2, yearlyPercentGrowth: 50, shares: 0.1 },
  { symbol: "ETH", amount: 10, yearlyPercentGrowth: 60, shares: 0.5 },
  { symbol: "XRP", amount: 500, yearlyPercentGrowth: 70, shares: 100 },
  { symbol: "LTC", amount: 20, yearlyPercentGrowth: 80, shares: 2 },
  { symbol: "ADA", amount: 1000, yearlyPercentGrowth: 90, shares: 200 },
  { symbol: "DOT", amount: 300, yearlyPercentGrowth: 100, shares: 30 },
  { symbol: "BCH", amount: 15, yearlyPercentGrowth: 110, shares: 1.5 },
  { symbol: "LINK", amount: 250, yearlyPercentGrowth: 120, shares: 25 },
  { symbol: "XLM", amount: 800, yearlyPercentGrowth: 130, shares: 80 },
  { symbol: "DOGE", amount: 10000, yearlyPercentGrowth: 140, shares: 1000 },
];

const iras = [
  { symbol: "VFINX", amount: 100, yearlyPercentGrowth: 5, shares: 0 },
  { symbol: "VTSAX", amount: 150, yearlyPercentGrowth: 6, shares: 0 },
  { symbol: "VTI", amount: 200, yearlyPercentGrowth: 7, shares: 0 },
  { symbol: "VOO", amount: 250, yearlyPercentGrowth: 8, shares: 0 },
  { symbol: "SPY", amount: 300, yearlyPercentGrowth: 9, shares: 0 },
  { symbol: "IVV", amount: 350, yearlyPercentGrowth: 10, shares: 0 },
  { symbol: "QQQ", amount: 400, yearlyPercentGrowth: 11, shares: 0 },
  { symbol: "DIA", amount: 450, yearlyPercentGrowth: 12, shares: 0 },
  { symbol: "IWM", amount: 500, yearlyPercentGrowth: 13, shares: 0 },
  { symbol: "VEA", amount: 550, yearlyPercentGrowth: 14, shares: 0 },
];

const holdings = [
  { title: "Stocks", data: stocks },
  { title: "Cryptocurrencies", data: cryptocurrencies },
  { title: "IRAs", data: iras },
];

const Dashboard = () => {
  const [linkToken, setLinkToken] = useState(null);
  const [numberOfYears, setNumberOfYears] = useState<Number>(40);

  const generateToken = async () => {
    const response = await fetch("/api/plaid/create-link-token", {
      method: "POST",
    });
    const data = await response.json();
    setLinkToken(data.link_token);
  };

  //access-sandbox-84fad6ac-6518-4101-97db-e17fd1435e4a
  const getAccountInfo = async () => {
    const response = await fetch("/api/plaid/account", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        access_token: "access-sandbox-84fad6ac-6518-4101-97db-e17fd1435e4a",
      }),
    });

    const data = await response.json();
    console.log(data);
  };
  useEffect(() => {
    generateToken();
  }, []);
  useEffect(() => {
    getAccountInfo();
  }, []);

  return (
    <div className="bg-white h-full w-full">
      {/* <TopPageNav {...topNavigationBarData} /> */}
      <div className="grid-cols-10 grid-rows-8 grid gap-6 p-4 mt-[2%]">
        <ProjectedNetWorthGraph />
        <ProjectedHoldingsCard
          holdings={holdings}
          numberOfYears={numberOfYears}
        />
      </div>
      {linkToken != null ? <Link linkToken={linkToken} /> : <></>}
      <SignOutButton />
      <DeleteUserButton />
    </div>
  );
};

export default Dashboard;
