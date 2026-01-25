import { useState, useEffect } from "react";

import { FutureProjectionData } from "@/types/future-projections/futureProjections";
import { TimeSeriesData } from "@/types/components/admin/graphs/data";

// Functions
import { filterProjectionData } from "@/features/projected-net-worth/utils/filterData";

/**
 * Custom hook to filter the projection data based on the selected year.
 * @param projectionData The raw data to filter.
 * @param selectedYear The year used for filtering the data.
 * @returns The filtered data.
 */
const useFilteredData = (
  futureProjectionData: FutureProjectionData | null | undefined | Error,
  selectedYear: number,
  selectedFilter: string
) => {
  if (futureProjectionData instanceof Error) return;

  const [filteredData, setFilteredData] = useState<
    { filterValue: string; data: TimeSeriesData[] }[]
  >([]);

  useEffect(() => {
    if (!futureProjectionData) return;

    const projectedNetWorthsData = futureProjectionData?.projectedNetWorth;

    if (!projectedNetWorthsData || projectedNetWorthsData.length === 0) {
      setFilteredData([]);
      return;
    }

    const filtered = projectedNetWorthsData?.map((projectedNetWorth) => {
      const filtered = filterProjectionData(
        projectedNetWorth.data,
        selectedYear
      );
      return { filterValue: projectedNetWorth.value, data: filtered };
    });
    setFilteredData(filtered);
  }, [futureProjectionData?.projectedNetWorth, selectedYear, selectedFilter]);

  return filteredData;
};

export default useFilteredData;
