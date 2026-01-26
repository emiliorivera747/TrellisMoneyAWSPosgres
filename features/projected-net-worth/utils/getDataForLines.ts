import { LineSeriesConfig } from "@/types/components/admin/graphs/data";
import {
  lineColors1,
  lineColors2,
} from "@/features/projected-net-worth/utils/data/lineColors";

/**
 *
 * Returns the data for the lines based on the selected filter and filtered data.
 *
 * @param selectedFilter
 * @param filteredData
 * @returns
 */
export const createLineConfigurations
 = (
  selectedFilter: string,
  filteredData: LineSeriesConfig[],
) => {
  const dataForLines =
    selectedFilter === "isBoth"
      ? [
          {
            data: filteredData?.[1]?.data || [],
            colorConfig: lineColors1,
            filterValue: filteredData?.[1]?.filterValue,
          },
          {
            data: filteredData?.[0]?.data || [],
            colorConfig: lineColors2,
            filterValue: filteredData?.[0]?.filterValue,
          },
        ]
      : [
          {
            data: filteredData?.[0]?.data || [],
            colorConfig: lineColors1,
            filterValue: filteredData?.[0]?.filterValue,
          },
        ];

  return dataForLines;
};
