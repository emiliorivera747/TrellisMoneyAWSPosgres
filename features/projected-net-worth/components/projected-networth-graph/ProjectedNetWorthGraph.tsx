"use client";

//React
import { useRef, useMemo } from "react";

//components
import ResponsiveLineGraphContainer from "@/components/dashboard/ResponsiveLineGraphContainer";
import ProjectedLineGraph from "@/features/projected-net-worth/components/projected-networth-graph/graphs/ProjectedLineGraph";
import ProjectedNetWorthGraphError from "@/components/errors/ProjectedNetWorthGraphError";

// External Libraries
import ProjectedNetWorthGraphSkeleton from "@/components/skeletons/dashboard/ProjectedNetWorthGraphSkeleton";

// Functions
import { generateYearsArray } from "@/features/projected-net-worth/utils/generateYearsArray";
import { createLineConfigurations } from "@/features/projected-net-worth/utils/getDataForLines";

// Hooks
import useFilteredData from "@/features/projected-net-worth/hooks/useFilteredData";

// Constants
const defaultYearsIntoTheFuture = 100;
const currentYear = Number(new Date().getFullYear().toString());

// Selectors
import { useDashboardFilters } from "@/stores/slices/dashboard/dashboardFilters.selectors";
import { ProjectedNetWorthGraphProps } from "@/features/projected-net-worth/types/graphComponents";

/**
 *
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

  const { selectedProjectedYear, selectedInflationFilter } =
    useDashboardFilters();

  /**
   *  Returns the filtered data based on the projectionData and selected filter.
   */
  const filteredData = useFilteredData(
    futureProjectionData,
    selectedProjectedYear,
    selectedInflationFilter
  );

  const years = useMemo(
    () =>
      generateYearsArray(currentYear, currentYear + defaultYearsIntoTheFuture),
    []
  );

  if (futureProjectionLoading) return <ProjectedNetWorthGraphSkeleton />;
  if (futureProjectionHasError || !filteredData)
    return <ProjectedNetWorthGraphError error={futureProjectionError} />;

  const lineConfigs = createLineConfigurations(
    selectedInflationFilter,
    filteredData
  );

  return (
    <div className="h-[30rem] grid border-b border-tertiary-300">
      <ResponsiveLineGraphContainer
        className={"h-[25rem] w-full border-box"}
        ref={containerRef}
        GraphComponent={ProjectedLineGraph}
        lineConfigs={lineConfigs}
        withInlfationTag={selectedInflationFilter === "withInflation"}
        years={years}
      />
    </div>
  );
};

export default ProjectedNetWorthGraph;
