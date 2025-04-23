import { LinePayload } from "@/types/graphs";
import {
  lineColors1,
  lineColors2,
} from "@/features/projected-net-worth/utils/data/lineColors";

export const getDataForLines = (
  selectedFilter: string,
  filteredData: LinePayload[]
) => {
  const dataForLines =
    selectedFilter === "isBoth"
      ? [
          { data: filteredData?.[1]?.data || [], ...lineColors1 },
          { data: filteredData?.[0]?.data || [], ...lineColors2 },
        ]
      : [{ data: filteredData?.[0]?.data || [], ...lineColors1 }];

  return dataForLines;
};
