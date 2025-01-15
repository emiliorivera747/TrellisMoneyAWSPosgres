"use client";
import { useState } from "react";

//components
import SelectYearMenuButton from "@/features/projected-net-worth/components/projected-networth-graph/select-year-menu/SelectYearMenuButton";
import GraphHeaders from "@/components/headers/GraphHeaders";
import ResponsiveLineGraph from "@/features/projected-net-worth/components/projected-networth-graph/graphs/one-line-graph/ResponsiveLineGraph";
import RenderFilters from "@/features/projected-net-worth/components/projected-networth-graph/RenderFilters";

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

//Data
import {
  lineColors1,
  lineColors2,
} from "@/features/projected-net-worth/utils/data/lineColors";

/**
 * Projects the future net worth of the user based on the data provided
 *
 */
const ProjectedNetWorthGraph = () => {
  const [selectedYear, setSelectedYear] = useState(currentYear + 40);

  const [retirementYear, setRetirementYear] = useState(currentYear + 40);
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

  /**
   * Filter the data based on the selected year
   */
  const filteredData = useFilteredData(projectionData, selectedYear);

  /**
   * Filter the data based on the selected year without
   */
  const { filteredDataNoInflation, filteredDataWithInflation } =
    useFilteredArrays(projectionData, selectedYear);

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
        <ResponsiveLineGraph
          tailwindClasses="h-[24rem] w-full border-box"
          filteredDataForLines={[
            {
              data: filteredDataNoInflation,
              lineColor: lineColors1.lineColor,
              tagTextColor: lineColors1.tagTextColor,
              tagBgColor: lineColors1.tagBgColor,
              subheaderColor: lineColors1.subheaderColor,
            },

            {
              data: filteredDataWithInflation,
              lineColor: lineColors2.lineColor,
              tagTextColor: lineColors2.tagTextColor,
              tagBgColor: lineColors2.tagBgColor,
              subheaderColor: lineColors2.subheaderColor,
            },
          ]}
          selectedYear={selectedYear}
        />
      ) : (
        <ResponsiveLineGraph
          tailwindClasses="h-[24rem] w-full border-box"
          filteredDataForLines={[
            {
              data: filteredData,
              lineColor: lineColors1.lineColor,
              tagTextColor: lineColors1.tagTextColor,
              tagBgColor: lineColors1.tagBgColor,
              subheaderColor: lineColors1.subheaderColor,
            },
          ]}
          selectedYear={selectedYear}
          withInflationTag={selectedFilter === "isInflation"}
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
