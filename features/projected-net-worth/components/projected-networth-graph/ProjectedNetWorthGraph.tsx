"use client";

//React
import React, { useRef, useMemo } from "react";

//components
import ResponsiveLineGraphContainer from "@/components/dashboard/ResponsiveLineGraphV2";
import ProjectedLineGraph from "@/features/projected-net-worth/components/projected-networth-graph/graphs/ProjectedLineGraph";
import ProjectedNetWorthGraphError from "@/components/errors/ProjectedNetWorthGraphError";

// External Libraries
import ProjectedNetWorthGraphSkeleton from "@/components/skeletons/dashboard/ProjectedNetWorthGraphSkeleton";

// Functions
import { generateYearsArray } from "@/features/projected-net-worth/utils/generateYearsArray";
import { createLinePayLoads } from "@/features/projected-net-worth/utils/getDataForLines";

// Hooks
import useFilteredData from "@/features/projected-net-worth/hooks/useFilteredData";

// Constants
const defaultYearsIntoTheFuture = 100;
const currentYear = Number(new Date().getFullYear().toString());

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
    futureProjectionData,
    futureProjectionLoading,
    futureProjectionError,
  } = useDashboardContext();

  /**
   *  Returns the filtered data based on the projectionData and selected filter.
   */
  const filteredData = useFilteredData(
    futureProjectionData,
    selectedYear,
    selectedFilter
  );

  const years = useMemo(
    () =>
      generateYearsArray(currentYear, currentYear + defaultYearsIntoTheFuture),
    []
  );

  if (futureProjectionLoading) return <ProjectedNetWorthGraphSkeleton />;
  if (futureProjectionError) return <ProjectedNetWorthGraphError />;

  const dataForLines = createLinePayLoads(selectedFilter, filteredData);

  return (
    <div className="grid-rows-[22rem_6rem] grid border-b border-tertiary-300">
      <ResponsiveLineGraphContainer
        className={"h-[25rem] w-full border-box"}
        ref={containerRef}
        GraphComponent={ProjectedLineGraph}
        linePayloads={dataForLines}
        withInlfationTag={selectedFilter === "isInflation"}
        years={years}
      />
    </div>
  );
};

export default ProjectedNetWorthGraph;
