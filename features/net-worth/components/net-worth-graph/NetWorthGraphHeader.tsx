import { useRef } from "react";

// Components
import GraphSummaryHeader from "@/components/graphs/graph-header/HeaderTimeValueGraph";
import GraphConfigSummaryList from "@/components/graphs/graph-header/GraphConfigSummaryList";
import GraphHeaderWithFilter from "@/components/graphs/graph-header/GraphHeaderWithFilter";

// Types
import { NetWorthGraphHeaderProps } from "@/features/net-worth/types/net-worth-graph-header";

// Config
import { filterConfig } from "@/features/net-worth/utils/config/filterConfig";

const NetWorthGraphHeader = ({ graphConfigs }: NetWorthGraphHeaderProps) => {
  const filterRef = useRef<HTMLDivElement>(null);
  return (
    <GraphSummaryHeader graphConfigs={graphConfigs}>
      <GraphHeaderWithFilter
        filterConfig={filterConfig}
        filterRef={filterRef}
        label={"Net Worth"}
      />
      <GraphConfigSummaryList graphConfigs={graphConfigs} />
    </GraphSummaryHeader>
  );
};

export default NetWorthGraphHeader;
