"use client";

//React
import React, { useState } from "react";

//components
import RenderFilters from "@/features/projected-net-worth/components/projected-networth-graph/filters/RenderFilters";
import ResponsiveLineGraphV2 from "@/components/dashboard/ResponsiveLineGraphV2";
import ProjectedLineGraph from "@/features/projected-net-worth/components/projected-networth-graph/graphs/ProjectedLineGraph";

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

//Types
import { ProjectedNetWorthGraphProps } from "@/features/projected-net-worth/types/graphComponents";

/**
 * Projects the future net worth of the user based on the data provided
 *
 */
const ProjectedNetWorthGraph = ({
  selectedYear,
  handleYearSelection,
  handleFilterChange,
  selectedFilter,
  projectionData,
  projectionLoading,
  projectionError,
}: ProjectedNetWorthGraphProps) => {
  
  const [retirementYear, setRetirementYear] = useState(currentYear + 40);

  const filteredData = useFilteredData(
    projectionData,
    selectedYear,
    selectedFilter
  );

  /**
   * Function to edit the retirement year
   *
   * @param year
   */
  const editRetirementYear = (year: number) => {
    setRetirementYear(year);
    handleYearSelection(year);
  };

  const years = generateYearsArray(
    currentYear,
    currentYear + defaultYearsIntoTheFuture
  );

  if (projectionLoading) return <ProjectedNetWorthGraphSkeleton />;
  if (projectionError)
    return (
      <div className="h-[30rem] border border-tertiary-400 p-4 rounded-xl font-semibold flex items-center justify-center text-lg">
        There was an error fetching the data
      </div>
    );

  const dataForLines =
    selectedFilter === "isBoth"
      ? [
          { data: filteredData?.[1]?.data || [], ...lineColors1 },
          { data: filteredData?.[0]?.data || [], ...lineColors2 },
        ]
      : [{ data: filteredData?.[0]?.data || [], ...lineColors1 }];

  return (
    <div className=" grid-rows-[26rem_6rem] grid">
      {/* Graph */}
      <ResponsiveLineGraphV2
        margin={{ top: 6, right: 6, bottom: 10, left: 6 }}
        tailwindClasses="h-[25rem] w-full border-box"
        GraphComponent={ProjectedLineGraph}
        dataForLines={dataForLines}
        withInlfationTag={selectedFilter === "isInflation"}
        years={years}
        selectedYear={selectedYear}
        retirementYear={retirementYear}
        setSelectedYear={handleYearSelection}
        editRetirementYear={editRetirementYear}
      />
      {/* Filters */}
      <RenderFilters
        selectedFilter={selectedFilter}
        handleFilterChange={handleFilterChange}
      />
    </div>
  );
};

export default ProjectedNetWorthGraph;
