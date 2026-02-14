// Components
import GraphSummaryHeader from "@/components/graphs/graph-header/HeaderTimeValueGraph";

// Types
import { GraphConfig } from "@/types/components/admin/graphs/graph-config";

interface HoldingHistoryGraphHeaderProps {
  graphConfigs: GraphConfig[];
}

const HoldingHistoryGraphHeader = ({
  graphConfigs,
}: HoldingHistoryGraphHeaderProps) => {
  return (
    <GraphSummaryHeader graphConfigs={graphConfigs}>
      <GraphSummaryHeader.Header label="Price History" />
      <GraphSummaryHeader.ConfigSummaryList className="grid-cols-[14rem]" />
    </GraphSummaryHeader>
  );
};

export default HoldingHistoryGraphHeader;
