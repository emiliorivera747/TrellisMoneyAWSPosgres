"use client";

//React
import React, { useState } from "react";

//components
import ResponsiveLineGraphV2 from "@/components/dashboard/ResponsiveLineGraphV2";
import ProjectedLineGraph from "@/features/projected-net-worth/components/projected-networth-graph/graphs/ProjectedLineGraph";
import ProjectedNetWorthGraphError from "@/components/errors/ProjectedNetWorthGraphError";

// External Libraries
import ProjectedNetWorthGraphSkeleton from "@/components/skeletons/dashboard/ProjectedNetWorthGraphSkeleton";

//Functions
import { generateYearsArray } from "@/features/projected-net-worth/utils/generateYearsArray";
import { getDataForLines } from "@/features/projected-net-worth/utils/getDataForLines";

// Hooks
import useFilteredData from "@/features/projected-net-worth/utils/hooks/useFilteredData";

// Constants
const defaultYearsIntoTheFuture = 100;
const currentYear = Number(new Date().getFullYear().toString());
const DEFAULT_RETIREMENT_YEAR = currentYear + 40;

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
  const [retirementYear, setRetirementYear] = useState(DEFAULT_RETIREMENT_YEAR);

  /**
   *  Returns the filtered data based on the projectionData and selected filter.
   */
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
  if (projectionError) return <ProjectedNetWorthGraphError />;

  const dataForLines = getDataForLines(selectedFilter, filteredData);

  return (
    <div className="grid-rows-[22rem_6rem] grid border-b border-tertiary-300">
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
    </div>
  );
};

export default ProjectedNetWorthGraph;
