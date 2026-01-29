"use client";
import { useMemo } from "react";

// Config
import { colorConfigs } from "@/features/projected-net-worth/utils/data/lineColors";

// Types
import { LineSeriesConfig, TimeSeriesData } from "@/types/components/admin/graphs/data";
import { NetWorthHistoryData } from "@/app/api/net-worth-history/route";

// Hooks
import { useFetchNetWorthHistory } from "@/features/net-worth/hooks/useFetchNetWorthHistory";

// Store
import { useAccountsFiltersWithActions } from "@/stores/slices/accounts/accountFilters.selectors";

/**
 * Transforms API net worth history data into line series configs based on filter.
 */
const transformHistoryToLineConfigs = (
  history: NetWorthHistoryData[],
  filter: string
): { value: string; data: TimeSeriesData[] }[] => {
  if (filter === "net-worth") {
    return [
      {
        value: "Net Worth",
        data: history.map((item) => ({
          date: new Date(item.date),
          value: item.netWorth,
        })),
      },
    ];
  }

  // assets-liabilities filter
  return [
    {
      value: "Assets",
      data: history.map((item) => ({
        date: new Date(item.date),
        value: item.totalAssets,
      })),
    },
    {
      value: "Liabilities",
      data: history.map((item) => ({
        date: new Date(item.date),
        value: item.totalLiabilities,
      })),
    },
  ];
};

/**
 * Hook to filter net worth data by filter and date range.
 * Fetches real data from the API and filters by selected date range.
 */
export const useFilteredNetWorth = () => {
  const {
    netWorthHistoryData,
    netWorthHistoryLoading,
    netWorthHistoryHasError,
    netWorthHistoryError,
  } = useFetchNetWorthHistory();

  const { selectedFilter, startDate, endDate } =
    useAccountsFiltersWithActions();

  const filteredData = useMemo<LineSeriesConfig[]>(() => {
    if (!netWorthHistoryData || netWorthHistoryData.length === 0) {
      return [];
    }

    const lineData = transformHistoryToLineConfigs(
      netWorthHistoryData,
      selectedFilter
    );

    return lineData.map((item, index) => ({
      filterValue: item.value,
      data: item.data.filter((timeSeries) => {
        return startDate <= timeSeries.date && timeSeries.date <= endDate;
      }),
      colorConfig: colorConfigs[index],
    }));
  }, [netWorthHistoryData, selectedFilter, startDate, endDate]);

  return {
    filteredData,
    isLoading: netWorthHistoryLoading,
    hasError: netWorthHistoryHasError,
    error: netWorthHistoryError,
  };
};
