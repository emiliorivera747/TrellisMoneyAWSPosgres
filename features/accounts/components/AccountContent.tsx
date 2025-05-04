"use client";
import React, { useRef, useState } from "react";
import { dateFilterConfig } from "@/features/accounts/config/dateFilterConfig";

// Components
import ResponsiveLineGraphV2 from "@/components/dashboard/ResponsiveLineGraphV2";
import NetWorthGraph from "@/features/net-worth/components/net-worth-graph/NetWorthGraph";
import DateFilter from "@/features/accounts/components/DateFilter";

// Context
import { useAccountsContext } from "@/context/accounts/AccountContext";

// Types
import { useFilterNetWorth } from "@/features/net-worth/hooks/useFilterNetWorth";

/**
 *
 * Responsible for showing all of the accounts
 * and other important metrics
 *
 * @returns
 */
const AccountContent = () => {
  
  const graphRef = useRef<HTMLDivElement>(null);

  const {
    filter,
    startDate,
    endDate,
    handleDateFilterChange,
  } = useAccountsContext();

  const {filteredData} = useFilterNetWorth({ filter, startDate, endDate});

  return (
    <section className="h-screen mx-[10%] mt-[3.2rem]">
      <div className="relative grid grid-rows-[26rem_6rem] border-tertiary-400 h-[34rem] border px-8 py-8 rounded-[12px] ">
        <ResponsiveLineGraphV2
          className={`w-full h-[27rem] `}
          ref={graphRef}
          GraphComponent={NetWorthGraph}
          linePayloads={filteredData}
        />
        <DateFilter
          handleDateFilterChange={handleDateFilterChange}
          dateFilter={dateFilterConfig}
        />
      </div>
    </section>
  );
};

export default AccountContent;
