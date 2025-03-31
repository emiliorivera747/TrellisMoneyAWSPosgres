import { useState, useEffect } from "react";
import { SecurityData } from "@/features/projected-net-worth/types/graphComponents";

// Functions
import { filterProjectionData } from "@/features/projected-net-worth/utils/filterData";

type projectedNetWorth = {
  value: String;
  data: SecurityData[];
};

/**
 * Custom hook to filter the projection data based on the selected year.
 * @param projectionData The raw data to filter.
 * @param selectedYear The year used for filtering the data.
 * @returns The filtered data.
 */
const useFilteredData = (
  projectionData: projectedNetWorth[] | undefined | null,
  selectedYear: number,
  selectedFilter: string
) => {
  const [filteredData, setFilteredData] = useState<projectedNetWorth[]>([]);

  useEffect(() => {

    if (!projectionData || projectionData.length === 0) {
      setFilteredData([]); 
      return;
    }

    const filtered = projectionData?.map((item) => {
      const filtered = filterProjectionData(item.data, selectedYear);
      return { value: item.value, data: filtered };
    });

    setFilteredData(filtered);
  }, [projectionData, selectedYear, selectedFilter]);

  return filteredData;
};

export default useFilteredData;
