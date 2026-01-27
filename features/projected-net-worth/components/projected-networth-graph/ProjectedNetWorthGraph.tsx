"use client";

// React
import { useRef} from "react";

// Components
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
const DEFAULT_YEARS_INTO_THE_FUTURE = 100;
const CURRENT_YEAR = new Date().getFullYear();
const YEARS = generateYearsArray(
  CURRENT_YEAR,
  CURRENT_YEAR + DEFAULT_YEARS_INTO_THE_FUTURE
);

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
  
  const graphContainerRef = useRef(null);

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
        ref={graphContainerRef}
        component={ProjectedLineGraph}
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
