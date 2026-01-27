import {
  lineColors1,
  lineColors2,
} from "@/features/projected-net-worth/utils/data/lineColors";
import { TimeSeriesData } from "@/types/components/admin/graphs/data";
import {
  FutureProjectionData,
  InflationFilters,
} from "@/types/future-projections/futureProjections";
import { NetWorthData } from "@/features/projected-net-worth/types/projectedNetWorth";

const convertNetWorthToTimeSeries = (
  projectedNetWorth: NetWorthData[]
): TimeSeriesData[] =>
  projectedNetWorth.map(({ date, value }) => ({
    date: new Date(date),
    value,
  }));

const getLineColor = (filterValue: InflationFilters) => {
  return filterValue === "actual" ? lineColors1 : lineColors2;
};

/**
 * Creates line configurations for the projected net worth graph.
 * Sorts data to ensure "actual" values appear first, then maps each entry
 * to include transformed time series data and appropriate color configuration.
 */
export const createLineConfigurations = (
  futureProjectionData: FutureProjectionData | undefined
) => {
  if (!futureProjectionData?.projectedNetWorth) {
    return [];
  }

  return futureProjectionData.projectedNetWorth
    .toSorted((a, b) => {
      if (a.filterValue === "actual") return -1;
      if (b.filterValue === "actual") return 1;
      return 0;
    })
    .map(({ filterValue, data }) => ({
      filterValue,
      data: convertNetWorthToTimeSeries(data),
      colorConfig: getLineColor(filterValue),
    }));
};
