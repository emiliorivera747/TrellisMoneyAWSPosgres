"use client";
import { useEffect, useState } from "react";

// Config
import { colorConfigs } from "@/features/projected-net-worth/utils/data/lineColors";

// Types
import { LineSeriesConfig } from "@/types/components/admin/graphs/graphs";

// Utils
import { getNetWorthDataByFilter } from "@/features/net-worth/utils/data/networth/mockNetWorthData";

import { useAccountsFiltersWithActions } from "@/stores/slices/accounts/accountFilters.selectors";

/**
 * Hook to filter net worth data by filter and date range.
 *
 * @param {UseFilterNetWorthProps} props - Filtering properties.
 */
export const useFilteredNetWorth = () => {
  const [filteredData, setFilteredData] = useState<LineSeriesConfig[] | []>([]);
  const { selectedFilter, startDate, endDate } =
    useAccountsFiltersWithActions();

  useEffect(() => {
    const data = getNetWorthDataByFilter(selectedFilter);

    const filteredData = data.map((netWorthItem, index) => {
      return {
        filterValue: netWorthItem.value,
        data: netWorthItem.data.filter((timeSeries) => {
          return startDate <= timeSeries.date && timeSeries.date <= endDate;
        }),
        colorConfig: colorConfigs[index],
      };
    });

    setFilteredData(filteredData);
  }, [selectedFilter, startDate, endDate]);

  return { filteredData };
};
