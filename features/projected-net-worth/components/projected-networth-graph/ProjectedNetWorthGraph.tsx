"use client";
import { useState } from "react";

//components
import SelectYearMenuButton from "@/features/projected-net-worth/components/projected-networth-graph/select-year-menu/SelectYearMenuButton";
import GraphHeaders from "@/components/headers/GraphHeaders";
import ResponsiveLineGraph from "@/features/projected-net-worth/components/projected-networth-graph/ResponsiveLineGraph";
import RenderFilters from "@/features/projected-net-worth/components/projected-networth-graph/RenderFilters";
import ResponsiveDoubleLineGraph from "@/features/projected-net-worth/components/projected-networth-graph/ResponsiveDoubleLineGraph";

// External Libraries
import { useQuery } from "@tanstack/react-query";
import ProjectedNetWorthGraphSkeleton from "@/components/skeletons/dashboard/ProjectedNetWorthGraphSkeleton";

//Functions
import { generateYearsArray } from "@/features/projected-net-worth/utils/generateYearsArray";
import { fetchProjectionData } from "@/features/projected-net-worth/utils/fetchProjectionData";

// Hooks
import useFilteredData from "@/features/projected-net-worth/utils/hooks/useFilteredData";
import useFilteredArrays from "@/features/projected-net-worth/utils/hooks/useFilteredArrays";

// Constants
const defaultYearsIntoTheFuture = 100;
const currentYear = Number(new Date().getFullYear().toString());

/**
 * Projects the future net worth of the user based on the data provided
 *
 */
const ProjectedNetWorthGraph = () => {
  const [selectedYear, setSelectedYear] = useState(
    currentYear + defaultYearsIntoTheFuture
  );

  const [retirementYear, setRetirementYear] = useState(2064);
  const [selectedFilter, setSelectedFilter] = useState("isNoInflation");

  const {
    data: projectionData,
    error: projectionError,
    isLoading: projectionLoading,
  } = useQuery({
    queryKey: ["projectedNetWorth", currentYear, selectedYear, selectedFilter],
    queryFn: () =>
      fetchProjectionData(
        Number(currentYear),
        Number(selectedYear),
        selectedFilter
      ),
    enabled: !!selectedYear,
  });

  // console.log(projectionData);

  // Use custom hook for filtering
  const filteredData = useFilteredData(projectionData, selectedYear);

  const { filteredDataNoInflation, filteredDataWithInflation } =
    useFilteredArrays(projectionData, selectedYear);
  // console.log("filtered data", filteredData);

  /**
   * Function to handle the change of the filter
   *
   * @param filterType
   */
  const handleFilterChange = (filterType: string) => {
    setSelectedFilter(filterType);
  };

  /**
   * Function to edit the retirement year
   *
   * @param year
   */
  const editRetirementYear = (year: number) => {
    setRetirementYear(year);
    setSelectedYear(year);
  };

  const years = generateYearsArray(
    currentYear,
    currentYear + defaultYearsIntoTheFuture
  );

  if (projectionLoading) return <ProjectedNetWorthGraphSkeleton />;
  if (projectionError) throw new Error(projectionError.message);

  return (
    <div className="sm:mx-2 mb-8">
      {/* Graph Header with button */}
      <div className="flex flex-row items-center gap-2 font-medium text-tertiary-900 ">
        <GraphHeaders label="Projected Net Worth" />
        <SelectYearMenuButton
          selectedYear={selectedYear}
          years={years}
          retirementYear={retirementYear}
          setSelectedYear={setSelectedYear}
          editRetirementYear={editRetirementYear}
        />
      </div>

      {/* Graph */}
      {selectedFilter === "isBoth" ? (
        <ResponsiveDoubleLineGraph
          tailwindClasses="h-[24rem] w-full border-box"
          filteredData1={filteredDataNoInflation}
          filteredData2={filteredDataWithInflation}
          selectedYear={selectedYear}
        />
      ) : (
        <ResponsiveLineGraph
          tailwindClasses="h-[24rem] w-full border-box"
          filteredData={filteredData}
          selectedYear={selectedYear}
        />
      )}

      {/* Filters */}
      <RenderFilters
        selectedFilter={selectedFilter}
        handleFilterChange={handleFilterChange}
      />
    </div>
  );
};

export default ProjectedNetWorthGraph;
