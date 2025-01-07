import { useState, useEffect } from "react";

/**
 * Custom hook to filter the projection data based on the selected year.
 * @param projectionData The raw data to filter.
 * @param selectedYear The year used for filtering the data.
 * @returns The filtered data.
 */
const useFilteredData = (projectionData: any, selectedYear: number) => {
  const [filteredData, setFilteredData] = useState<any[]>([]);

  useEffect(() => {
    if (projectionData?.data) {
      const filtered = projectionData.data
        .filter((data: { date: Date }) => new Date(data.date).getFullYear() <= selectedYear)
        .map((data: { date: Date; close: number }) => ({
          date: new Date(data.date),
          close: data.close,
        }));
      setFilteredData(filtered);
    }
  }, [projectionData, selectedYear]);

  return filteredData;
};

export default useFilteredData;
