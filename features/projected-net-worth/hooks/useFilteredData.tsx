import { useState, useEffect } from "react";

import { FutureProjectionData, ProjectedNetworth } from "@/types/futureProjections";
import { SecurityData } from "@/types/graphs";

// Functions
import { filterProjectionData } from "@/features/projected-net-worth/utils/filterData";


/**
 * Custom hook to filter the projection data based on the selected year.
 * @param projectionData The raw data to filter.
 * @param selectedYear The year used for filtering the data.
 * @returns The filtered data.
 */
const useFilteredData = (
  futureProjectionData: FutureProjectionData | null | undefined,
  selectedYear: number,
  selectedFilter: string
) => {

  const [filteredData, setFilteredData] = useState<{ value: string; lineData: SecurityData[] }[]>([]);

  useEffect(() => {
    if (!futureProjectionData) return;
    
    const projectedNetWorthsData = futureProjectionData?.projected_net_worth;
   
    if (!projectedNetWorthsData || projectedNetWorthsData.length === 0) {
      setFilteredData([]);
      return;
    }

    const filtered = projectedNetWorthsData?.map((projectedNetWorth) => {
      const filtered = filterProjectionData(projectedNetWorth.data, selectedYear);
      return { value: projectedNetWorth.value, lineData: filtered };
    });
    setFilteredData(filtered);
  }, [futureProjectionData?.projected_net_worth, selectedYear, selectedFilter]);

  return filteredData;
};

export default useFilteredData;
