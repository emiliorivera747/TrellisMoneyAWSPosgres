import { useState } from "react";

// Components
import GraphSummaryHeader from "@/components/graphs/graph-header/HeaderTimeValueGraph";

// Types
import { NetWorthGraphHeaderProps } from "@/features/net-worth/types/net-worth-graph-header";

// Config
import {
  filterConfig,
  AccountGraphFilter,
} from "@/features/net-worth/utils/config/filterConfig";

/**
 * Header component for the Net Worth graph.
 * Displays a filter dropdown and a summary list of graph configurations
 * showing current values and changes over time.
 */
const NetWorthGraphHeader = ({ graphConfigs }: NetWorthGraphHeaderProps) => {
  const [selectedFilter, setSelectFilter] =
    useState<AccountGraphFilter>("net-worth");
  const handleOnFilterChange = (filter: AccountGraphFilter) => {
    setSelectFilter(filter);
  };

  return (
    <GraphSummaryHeader graphConfigs={graphConfigs}>
      <div className="flex flex-row justify-between">
        <GraphSummaryHeader.Header label="Net Worth" />
        <GraphSummaryHeader.FilterButton
          filterConfig={filterConfig}
          selectedFilter={selectedFilter}
          handleFilterChange={handleOnFilterChange}
        />
      </div>
      <GraphSummaryHeader.ConfigSummaryList />
    </GraphSummaryHeader>
  );
};

export default NetWorthGraphHeader;
