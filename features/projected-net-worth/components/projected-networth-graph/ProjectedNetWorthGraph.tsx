"use client";

// React
import { useRef } from "react";

// Components
import ProjectedNetWorthLineChart from "@/features/projected-net-worth/components/projected-networth-graph/graphs/ProjectedLineGraph";
import ProjectedNetWorthGraphError from "@/components/errors/ProjectedNetWorthGraphError";
import ResponsiveGraphContainer from "@/components/graphs/primary-time-value-graph/ResponsiveGraphContainer";
import ProjectedNetWorthGraphSkeleton from "@/components/skeletons/dashboard/ProjectedNetWorthGraphSkeleton";

// Functions
import { generateYearsArray } from "@/features/projected-net-worth/utils/generateYearsArray";
import { createLineConfigurations } from "@/features/projected-net-worth/utils/getDataForLines";

// Selectors
import { useDashboardFilters } from "@/stores/slices/dashboard/dashboardFilters.selectors";

// Types
import { ProjectedNetWorthGraphProps } from "@/features/projected-net-worth/types/graphComponents";

// Constants
const DEFAULT_YEARS_INTO_THE_FUTURE = 100;
const CURRENT_YEAR = new Date().getFullYear();
const YEARS = generateYearsArray(
  CURRENT_YEAR,
  CURRENT_YEAR + DEFAULT_YEARS_INTO_THE_FUTURE
);

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

  const graphContainerRef = useRef(null);
  const { selectedProjectedYear, selectedInflationFilter } =
    useDashboardFilters();
  
  if (futureProjectionLoading) return <ProjectedNetWorthGraphSkeleton />;
  if (futureProjectionHasError || futureProjectionData instanceof Error)
    return <ProjectedNetWorthGraphError error={futureProjectionError} />;
  
  const lineConfigs = createLineConfigurations(futureProjectionData);

  return (
    <div className="h-[30rem] grid border-b border-tertiary-300">
      <ResponsiveGraphContainer
        className={"h-[25rem] w-full border-box"}
        ref={graphContainerRef}
        component={ProjectedNetWorthLineChart}
        componentProps={{
          lineConfigs,
          withInlfationTag: selectedInflationFilter === "inflationAdjusted",
          years: YEARS,
          retirementYear: CURRENT_YEAR + 30,
          selectedYear: selectedProjectedYear,
        }}
      />
    </div>
  );
};

export default ProjectedNetWorthGraph;
