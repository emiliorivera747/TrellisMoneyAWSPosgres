import { useRef, useState } from "react";

// Components
import GraphSummaryHeader from "@/components/graphs/graph-header/HeaderTimeValueGraph";

// Types
import { NetWorthGraphHeaderProps } from "@/features/net-worth/types/net-worth-graph-header";

// Config
import { filterConfig } from "@/features/net-worth/utils/config/filterConfig";

/**
 * Header component for the Net Worth graph.
 * Displays a filter dropdown and a summary list of graph configurations
 * showing current values and changes over time.
 */
const NetWorthGraphHeader = ({ graphConfigs }: NetWorthGraphHeaderProps) => {
  const filterRef = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedFilter, setSelectFilter] = useState("net-worth");

  const handleOpenChange = () => {};
  const handleOnFilterChange = () => {};

  return (
    <GraphSummaryHeader graphConfigs={graphConfigs}>
      <div className="flex flex-row justify-between">
        <GraphSummaryHeader.Header label="Net Worth" />
        <GraphSummaryHeader.FilterButton
          filterConfig={filterConfig}
          isOpen={isOpen}
          onOpenChange={handleOpenChange}
          selectedFilter={selectedFilter}
          onFilterChange={handleOnFilterChange}
        />
      </div>
      <GraphSummaryHeader.ConfigSummaryList />
    </GraphSummaryHeader>
  );
};

export default NetWorthGraphHeader;
