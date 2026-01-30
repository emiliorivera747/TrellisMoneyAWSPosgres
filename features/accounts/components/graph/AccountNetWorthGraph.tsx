import { useRef } from "react";

// Components
import DateFilter from "@/features/accounts/components/filter/DateFilter";
import NetWorthTypeFilter from "@/features/accounts/components/filter/NetWorthTypeFilter";
import NetWorthGraph from "@/features/net-worth/components/net-worth-graph/NetWorthGraph";
import ResponsiveLineGraphContainer from "@/components/graphs/primary-time-value-graph/ResponsiveGraphContainer";
import NetWorthGraphError from "@/features/accounts/components/graph/NetWorthGraphError";
import NetWorthGraphSkeleton from "@/features/accounts/components/skeleton/NetWorthGraphSkeleton";

// Hooks
import { useFilteredNetWorth } from "@/features/net-worth/hooks/useFilteredNetWorth";
import { useFetchNetWorthHistory } from "@/features/net-worth/hooks/useFetchNetWorthHistory";


// Store
import { useAccountsFiltersWithActions } from "@/stores/slices/accounts/accountFilters.selectors";


/**
 * Renders a net worth graph with a date filter.
 * Shows loading skeleton while data is being fetched.
 * Shows error state if data fetch fails.
 *
 * @returns {JSX.Element} The NetWorthGraph component.
 */
const AccountNetWorthGraph = () => {
  const graphRef = useRef<HTMLDivElement>(null);
  
  const {
    netWorthHistoryData,
    netWorthHistoryLoading,
    netWorthHistoryHasError,
    netWorthHistoryError,
  } = useFetchNetWorthHistory();

  const { selectedFilter, startDate, endDate } =
  useAccountsFiltersWithActions();

  const { filteredData, isLoading, hasError, error } = useFilteredNetWorth(); 
  if (isLoading) return <NetWorthGraphSkeleton />;
  if (hasError) return <NetWorthGraphError error={error} />;

  return (
    <div className="relative grid grid-rows-[22rem_6rem] h-[32rem] border-b">
      <ResponsiveLineGraphContainer
        className="w-full h-[26rem]"
        ref={graphRef}
        component={NetWorthGraph}
        componentProps={{
          lineConfigs: filteredData,
        }}
      />
      <DateFilter />
    </div>
  );
};

export default AccountNetWorthGraph;
