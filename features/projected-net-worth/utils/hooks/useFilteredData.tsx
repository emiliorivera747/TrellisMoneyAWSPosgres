import { useState, useEffect } from "react";
import { SecurityData } from "@/features/projected-net-worth/types/graphComponents";

// Functions
import {filterProjectionData} from '@/features/projected-net-worth/utils/filterData'

/**
 * Custom hook to filter the projection data based on the selected year.
 * @param projectionData The raw data to filter.
 * @param selectedYear The year used for filtering the data.
 * @returns The filtered data.
 */
const useFilteredData = (
  projectionData: {data: SecurityData[]},
  selectedYear: number,
) => {
  const [filteredData, setFilteredData] = useState<SecurityData[]>([]);

  useEffect(() => {
    if (!projectionData?.data) {
      return;
    }
    const filtered = filterProjectionData(projectionData?.data, selectedYear);
    setFilteredData(filtered);
  }, [projectionData, selectedYear]);

  return filteredData;
};

export default useFilteredData;
