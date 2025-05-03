"use client";
import React, { useRef, useEffect, useState } from "react";
import { dateFilterConfig } from "@/features/accounts/config/dateFilterConfig";

// Components
import ResponsiveLineGraphV2 from "@/components/dashboard/ResponsiveLineGraphV2";
import NetWorthGraph from "@/features/net-worth/components/net-worth-graph/NetWorthGraph";
import { colorConfigs } from "@/features/projected-net-worth/utils/data/lineColors";
import DateFilter from "@/features/accounts/components/DateFilter";

import { getNetWorthDataByFilter } from "@/features/net-worth/utils/data/networth/mockNetWorthData";

import { useAccountsContext } from "@/context/accounts/AccountContext";

// Types
import { LinePayload } from "@/types/graphs";

const AccountContent = () => {
  const graphRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const {
    filter,
    startDate,
    endDate,
    handleStartDateChange,
    handleEndDateChange,
  } = useAccountsContext();

  const [filteredData, setFilteredData] = useState<LinePayload[] | []>([]);

  useEffect(() => {
    const data = getNetWorthDataByFilter(filter);

    const filteredData = data.map((netWorthItem, index) => {
      return {
        value: netWorthItem.value,
        lineData: netWorthItem.data.filter((timeSeries) => {
          // console.log(
          //   "startDate",
          //   startDate,
          //   "TimeSeriesDate",
          //   timeSeries.date,
          //   "endDate",
          //   endDate
          // );
          console.log("startDate", startDate.toUTCString());
          console.log("timeSeries.date", timeSeries.date.toUTCString());
          console.log("endDate", endDate.toUTCString());

          return startDate <= timeSeries.date && timeSeries.date <= endDate;
        }),
        colorConfig: colorConfigs[index],
      };
    });

    setFilteredData(filteredData);
  }, [filter, startDate, endDate]);

  const handleDateFilterChange = (startDate: Date, endDate: Date) => {
    handleStartDateChange(startDate);
    handleEndDateChange(endDate);
  };

  console.log("FilterdData", filteredData);
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
