"use client";

//React
import React, {useRef } from "react";

//components
import ResponsiveLineGraphContainer from "@/components/dashboard/ResponsiveLineGraphV2";
import ProjectedLineGraph from "@/features/projected-net-worth/components/projected-networth-graph/graphs/ProjectedLineGraph";
import ProjectedNetWorthGraphError from "@/components/errors/ProjectedNetWorthGraphError";

// External Libraries
import ProjectedNetWorthGraphSkeleton from "@/components/skeletons/dashboard/ProjectedNetWorthGraphSkeleton";

// Functions
import { generateYearsArray } from "@/features/projected-net-worth/utils/generateYearsArray";
import { getDataForLines } from "@/features/projected-net-worth/utils/getDataForLines";

// Hooks
import useFilteredData from "@/features/projected-net-worth/utils/hooks/useFilteredData";

// Constants
const defaultYearsIntoTheFuture = 100;
const currentYear = Number(new Date().getFullYear().toString());
const totalYearsRange = currentYear + defaultYearsIntoTheFuture;


// Context
import { useDashboardContext } from "@/context/dashboard/DashboardProvider";

/**
 * Projects the future net worth of the user based on the data provided
 *
 */
const ProjectedNetWorthGraph = () => {
  const containerRef = useRef(null);
  
  const {
    selectedYear,
    selectedFilter,
    projectionData,
    projectionLoading,
    projectionError,
  } = useDashboardContext();
  /**
   *  Returns the filtered data based on the projectionData and selected filter.
   */
  const filteredData = useFilteredData(
    projectionData?.projected_net_worth,
    selectedYear,
    selectedFilter
  );

  const years = generateYearsArray(currentYear, totalYearsRange);

  if (projectionLoading) return <ProjectedNetWorthGraphSkeleton />;
  if (projectionError) return <ProjectedNetWorthGraphError />;

  const dataForLines = getDataForLines(selectedFilter, filteredData);

  return (
    <div className="grid-rows-[22rem_6rem] grid border-b border-tertiary-300">
      <ResponsiveLineGraphContainer
        margin={{ top: 6, right: 6, bottom: 10, left: 6 }}
        className={"h-[25rem] w-full border-box"}
        ref={containerRef}
        GraphComponent={ProjectedLineGraph}
        dataForLines={dataForLines}
        withInlfationTag={selectedFilter === "isInflation"}
        years={years}
      />
    </div>
  );
};

export default ProjectedNetWorthGraph;
