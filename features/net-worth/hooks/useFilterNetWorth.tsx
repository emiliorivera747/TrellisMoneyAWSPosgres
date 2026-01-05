"use client";
import { useEffect, useState } from "react";

// Config
import { colorConfigs } from "@/features/projected-net-worth/utils/data/lineColors";

// Types
import { LinePayload } from "@/types/graphs";

// Utils
import { getNetWorthDataByFilter } from "@/features/net-worth/utils/data/networth/mockNetWorthData";

import { useAccountsFiltersWithActions } from "@/stores/slices/accounts/accountFilters.selectors";

/**
 * Hook to filter net worth data by filter and date range.
 *
 * @param {UseFilterNetWorthProps} props - Filtering properties.
 */
export const useFilterNetWorth = () => {
  const [filteredData, setFilteredData] = useState<LinePayload[] | []>([]);
  const { selectedFilter, startDate, endDate } =
    useAccountsFiltersWithActions();

  useEffect(() => {
    const data = getNetWorthDataByFilter(selectedFilter);

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
  }, [selectedFilter, startDate, endDate]);

  return { filteredData };
};
