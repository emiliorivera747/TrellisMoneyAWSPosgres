"use client";
import GraphSummaryHeader from "@/components/graphs/graph-header/HeaderTimeValueGraph";
import {
  useDashboardFilters,
  useDashboardFilterActions,
} from "@/stores/slices/dashboard/dashboardFilters.selectors";

import { PrimaryGraphHeaderProps } from "@/features/projected-net-worth/types/graphComponents";
import { InflationFilters } from "@/features/projected-net-worth/types/filters";
import { filterConfig } from "@/features/projected-net-worth/config/filterConfig";
import GraphLineSummaries from "@/features/projected-net-worth/components/projected-networth-graph/headers/GraphLineSummaries";
import SelectYearMenuButton from "@/features/projected-net-worth/components/projected-networth-graph/select-year-menu/SelectYearMenuButton";
import InflationTag from "@/features/projected-net-worth/components/projected-networth-graph/tags/InflationTag";

const PrimaryGraphHeader = ({
  graphConfigs,
  withInflationTag,
  years,
}: PrimaryGraphHeaderProps) => {
  const { selectedProjectedYear, retirementYear, selectedInflationFilter } =
    useDashboardFilters();

  const {
    setSelectedInflationFilter,
    setRetirementYear,
    setSelectedProjectedYear,
  } = useDashboardFilterActions();

  const handleFilterSelection = (filter: InflationFilters) => {
    setSelectedInflationFilter(filter);
  };

  const showInflationTag = withInflationTag && graphConfigs.length === 1;

  return (
    <GraphSummaryHeader graphConfigs={graphConfigs}>
      <div className="flex flex-row text-[1.4rem] gap-2 w-full justify-between">
        <div className="flex flex-row gap-4">
          <GraphSummaryHeader.Header label="Future Projection" />
          <div className="flex items-center">
            <SelectYearMenuButton
              selectedYear={selectedProjectedYear}
              years={years}
              retirementYear={retirementYear}
              setSelectedYear={setSelectedProjectedYear}
              editRetirementYear={setRetirementYear}
            />
          </div>
        </div>
        <GraphSummaryHeader.FilterButton
          filterConfig={filterConfig}
          selectedFilter={selectedInflationFilter}
          handleFilterChange={handleFilterSelection}
        />
      </div>
      <div className="flex flex-row">
        <GraphLineSummaries graphConfigs={graphConfigs} />
        {showInflationTag && (
          <div className="text-[0.7rem] text-tertiary-1000 gap-1 w-[25%] flex items-start justify-end pt-5">
            <InflationTag lineConfig={graphConfigs[0].lineConfig} />
          </div>
        )}
      </div>
    </GraphSummaryHeader>
  );
};

export default PrimaryGraphHeader;
