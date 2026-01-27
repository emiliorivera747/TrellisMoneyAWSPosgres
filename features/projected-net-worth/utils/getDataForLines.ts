import {
  lineColors1,
  lineColors2,
} from "@/features/projected-net-worth/utils/data/lineColors";
import { TimeSeriesData } from "@/types/components/admin/graphs/data";
import { InflationFilters } from "@/types/future-projections/futureProjections";
import { FutureProjectionData } from "@/types/future-projections/futureProjections";

/**
 *
 * Returns the data for the lines based on the selected filter and filtered data.
 *
 * @param selectedFilter
 * @param filteredData
 * @returns
 */
export const createLineConfigurations = (
  futureProjectionData: FutureProjectionData | undefined
) => {
  const projectedNetWorthData =
    futureProjectionData?.projectedNetWorth.map(({ filterValue, data }) => {
      const transformedData: TimeSeriesData[] = data.map((netWorthData) => ({
        date: new Date(netWorthData.date),
        value: netWorthData.value,
      }));

      const lineColors = filterValue === "actual" ? lineColors1 : lineColors2;

      return { filterValue, data: transformedData, colorConfig: lineColors };
    }) || [];

  return projectedNetWorthData;
};
