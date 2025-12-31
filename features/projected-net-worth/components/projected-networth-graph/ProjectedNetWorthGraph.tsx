"use client";

//React
import { useRef, useMemo } from "react";

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

// Types
import { FutureProjectionData } from "@/types/futureProjections";

// Selectors
import { useDashboardFilters } from "@/stores/slices/dashboardFilters.selectors";

interface ProjectedNetWorthGraphProps {
  futureProjectionData: FutureProjectionData | undefined;
  futureProjectionError?: Error | null;
  futureProjectionHasError: boolean;
  futureProjectionLoading: boolean;
}

/**
 * Projects the future net worth of the user based on the data provided
 *
 */
const ProjectedNetWorthGraph = ({
  futureProjectionData,
  futureProjectionError,
  futureProjectionHasError,
  futureProjectionLoading,
}: ProjectedNetWorthGraphProps) => {
  const containerRef = useRef(null);

  const { selectedYear, selectedFilter } = useDashboardFilters();

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
  if (futureProjectionHasError)
    return <ProjectedNetWorthGraphError error={futureProjectionError} />;

  const dataForLines = createLinePayLoads(selectedFilter, filteredData);

  return (
    <div className="grid-rows-[24rem_6rem] grid border-b border-tertiary-300">
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
