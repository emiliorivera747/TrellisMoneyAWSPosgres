import { LinePayload } from "@/types/graphs";
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
export const getDataForLines = (
  selectedFilter: string,
  filteredData: LinePayload[]
) => {
  const dataForLines =
    selectedFilter === "isBoth"
      ? [
          { data: filteredData?.[1]?.lineData || [], lineColors1 },
          { data: filteredData?.[0]?.lineData || [], lineColors2 },
        ]
      : [{ lineData: filteredData?.[0]?.lineData || [], lineColors1 }];

  return dataForLines;
};
