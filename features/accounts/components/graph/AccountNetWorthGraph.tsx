import { useRef } from "react";

// Components
import DateFilter from "@/features/accounts/components/filter/DateFilter";
import NetWorthGraph from "@/features/net-worth/components/net-worth-graph/NetWorthGraph";
import ResponsiveLineGraphContainer from "@/components/dashboard/ResponsiveLineGraphContainer";

// Hooks
import { useFilteredNetWorth } from "@/features/net-worth/hooks/useFilteredNetWorth";

/**
 * Renders a net worth graph with a date filter.
 *
 * @returns {JSX.Element} The NetWorthGraph component.
 */
const AccountNetWorthGraph = () => {
  const graphRef = useRef<HTMLDivElement>(null);
  const { filteredData } = useFilteredNetWorth();

  return (
    <div className="relative grid grid-rows-[22rem_6rem] h-[32rem] border-b">
      <ResponsiveLineGraphContainer
        className="w-full h-[26rem]"
        ref={graphRef}
        GraphComponent={NetWorthGraph}
        linePayloads={filteredData}
      />
      <DateFilter />
    </div>
  );
};

export default AccountNetWorthGraph;
