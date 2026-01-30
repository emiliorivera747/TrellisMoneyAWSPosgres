// Components
import GraphSummaryHeader from "@/components/graphs/graph-header/HeaderTimeValueGraph";

// Hooks
import { useAccountsFiltersWithActions } from "@/stores/slices/accounts/accountFilters.selectors";

// Types
import { NetWorthGraphHeaderProps } from "@/features/net-worth/types/net-worth-graph-header";
import { AccountGraphFilter } from "@/features/accounts/types/graph";

// Config
import { filterConfig } from "@/features/net-worth/utils/config/filterConfig";

/**
 * Header component for the Net Worth graph.
 * Displays a filter dropdown and a summary list of graph configurations
 * showing current values and changes over time.
 */
const NetWorthGraphHeader = ({ graphConfigs }: NetWorthGraphHeaderProps) => {
  const { selectedFilter, setSelectedFilter } = useAccountsFiltersWithActions();
  const handleOnFilterChange = (filter: AccountGraphFilter) => {
    setSelectedFilter(filter);
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
