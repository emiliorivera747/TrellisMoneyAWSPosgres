import { LinePayload } from "@/types/graphs";
import {
  lineColors1,
  lineColors2,
} from "@/features/projected-net-worth/utils/data/lineColors";

import { InflationFilters } from "@/features/projected-net-worth/types/filters";

/**
 *
 * Returns the data for the lines based on the selected filter and filtered data.
 *
 * @param selectedFilter
 * @param filteredData
 * @returns
 */
export const createLinePayLoads = (
  selectedFilter: string,
  filteredData: LinePayload[],
) => {
  const dataForLines =
    selectedFilter === "isBoth"
      ? [
          {
            lineData: filteredData?.[1]?.lineData || [],
            colorConfig: lineColors1,
            value: filteredData?.[1]?.value,
          },
          {
            lineData: filteredData?.[0]?.lineData || [],
            colorConfig: lineColors2,
            value: filteredData?.[0]?.value,
          },
        ]
      : [
          {
            lineData: filteredData?.[0]?.lineData || [],
            colorConfig: lineColors1,
            value: filteredData?.[0]?.value,
          },
        ];

  return dataForLines;
};
