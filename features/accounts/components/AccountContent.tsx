"use client";
import React, { useRef, useState } from "react";
import Link from "@/components/Plaid/Link";
import useGenerateToken from "@/hooks/plaid/useGenerateToken";

// Components
import ResponsiveLineGraphV2 from "@/components/dashboard/ResponsiveLineGraphV2";
import NetWorthGraph from "@/features/net-worth/components/net-worth-graph/NetWorthGraph";
import LineGraphTimeButton from "@/components/buttons/LineGraphTimeButton";
import {
  lineColors1,
  lineColors2,
} from "@/features/projected-net-worth/utils/data/lineColors";

import {
  mockHistoricalNetWorthData,
  assetsData,
  liabilitiesData,
} from "@/features/net-worth/utils/data/networth/mockNetWorthData";

import { useAccountsContext } from "@/context/accounts/AccountContext";

const AccountContent = () => {
  const graphRef = useRef<HTMLDivElement>(null);
  const { filter } = useAccountsContext();

  return (
    <section className="h-screen mx-28 mt-[3.2rem]">
      <div className="relative grid grid-rows-[28rem_6rem]  border-tertiary-400 h-[34rem] border px-8 py-4 rounded-[12px] ">
        <ResponsiveLineGraphV2
          className={`w-full h-[26rem]`}
          ref={graphRef}
          GraphComponent={NetWorthGraph}
          linePayloads={
            filter === "net-worth"
              ? [
                  {
                    lineData: mockHistoricalNetWorthData,
                    colorConfig: lineColors1,
                    value: "Net Worth",
                  },
                ]
              : [
                  {
                    lineData: assetsData,
                    colorConfig: lineColors1,
                    value: "Assets",
                  },
                  {
                    lineData: liabilitiesData,
                    colorConfig: lineColors2,
                    value: "Liabilities",
                  },
                ]
          }
          years={[]}
        />
        <div className="flex flex-row items-center absolute bottom-8 left-4">
          <LineGraphTimeButton label="1D" />
          <LineGraphTimeButton label="1W" />
          <LineGraphTimeButton label="1M" />
          <LineGraphTimeButton label="3M" />
          <LineGraphTimeButton label="YTD" />
          <LineGraphTimeButton label="ALL" />
        </div>
      </div>

      {/* <header className="mt-8 px-4">
    <h1 className="text-xl">Accounts</h1>
    <div className="h-full w-[30%] sticky top-0 pt-[2%]">
      <Link linkToken={linkToken} />
    </div>
    <div className="flex flex-col gap-4 mt-8">
      {isLoadingAccounts && <p>Loading...</p>}
      {isErrorAccounts && <p>Error</p>}
      {accountsResponse &&
        accountsResponse.data.map((account, i) => (
          <div key={i} className="border p-4 rounded">
            <h2 className="text-sm text-tertiary-1000 mb-2">
              {JSON.stringify(account, null, 3)}
            </h2>
          </div>
        ))}
    </div>
  </header> */}
    </section>
  );
};

export default AccountContent;
