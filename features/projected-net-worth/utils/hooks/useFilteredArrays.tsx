import { useState, useEffect } from "react";
import { SecurityData } from "@/features/projected-net-worth/types/graphComponents";
import { filterProjectionData } from "@/features/projected-net-worth/utils/filterData";

interface projectionData {
  noInflationData: { data: SecurityData[] };
  inflationData: { data: SecurityData[] };
}
/**
 * Custom hook to filter the projection data based on the selected year.
 * @param projectionData The raw data to filter.
 * @param selectedYear The year used for filtering the data.
 * @returns The filtered data.
 */
const useFilteredArrays = (
  projectionData: projectionData,
  selectedYear: number
) => {
  
  // const [filteredDataNoInflation, setFilteredDataNoInflation] = useState<
  //   SecurityData[]
  // >([]);

  // const [filteredDataWithInflation, setFilteredDataWithInflation] = useState<
  //   SecurityData[]
  // >([]);

  // useEffect(() => {
  //   if (projectionData?.noInflationData && projectionData?.inflationData) {
  //     const filteredNoInflation = filterProjectionData(
  //       projectionData.noInflationData.data.projected_net_worth,
  //       selectedYear
  //     );
  //     setFilteredDataNoInflation(filteredNoInflation);

  //     const filteredWithInflation = filterProjectionData(
  //       projectionData.inflationData.data.projected_net_worth,
  //       selectedYear
  //     );
  //     setFilteredDataWithInflation(filteredWithInflation);
  //   }
  // }, [projectionData, selectedYear]);

  // const res = { filteredDataNoInflation, filteredDataWithInflation };
  let res = null;
  return res;
};

export default useFilteredArrays;
