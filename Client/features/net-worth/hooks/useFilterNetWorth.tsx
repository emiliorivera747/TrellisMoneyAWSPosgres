"use client";
import { useEffect, useState } from "react";

// Config
import { colorConfigs } from "@/features/projected-net-worth/utils/data/lineColors";

// Types
import { UseFilterNetWorthProps } from "@/features/net-worth/types/hooks";
import { LinePayload } from "@/types/graphs";

// Utils
import { getNetWorthDataByFilter } from "@/features/net-worth/utils/data/networth/mockNetWorthData";

/**
 * Custom hook to filter net worth data based on the provided filter and date range.
 *
 * @param {UseFilterNetWorthProps} props - The properties for filtering net worth data.
 * @param {string} props.filter - The filter to apply to the net worth data.
 * @param {Date} props.startDate - The start date for filtering the net worth data.
 * @param {Date} props.endDate - The end date for filtering the net worth data.
 * @param {React.Dispatch<React.SetStateAction<any>>} props.setFilteredData - The state setter function to update the filtered data.
 */
export const useFilterNetWorth = ({
  filter,
  startDate,
  endDate,
}: UseFilterNetWorthProps) => {
  
  const [filteredData, setFilteredData] = useState<LinePayload[] | []>([]);
  
  useEffect(() => {
    const data = getNetWorthDataByFilter(filter);

    const filteredData = data.map((netWorthItem, index) => {
      return {
        value: netWorthItem.value,
        lineData: netWorthItem.data.filter((timeSeries) => {
          return startDate <= timeSeries.date && timeSeries.date <= endDate;
        }),
        colorConfig: colorConfigs[index],
      };
    });

    setFilteredData(filteredData);
  }, [filter, startDate, endDate]);

  
  return { filteredData };
};
