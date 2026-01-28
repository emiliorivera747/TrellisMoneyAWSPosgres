import { useRef } from "react";

// Components
import GraphSummaryHeader, {
  Value,
  ValueChange,
  TotalYears,
} from "@/components/dashboard/HeaderTimeValueGraph";
import GraphHeader from "@/components/headers/GraphHeader";
import GraphFilterButtonWithModal from "@/components/buttons/GraphFilterButtonWithModal";

// Types
import { NetWorthGraphHeaderProps } from "@/features/net-worth/types/net-worth-graph-header";

// Utils
import { getDirectionalColorsByLineConfig } from "@/features/projected-net-worth/utils/graph-helpers/getDirectionalColors";

// Config
import { filterConfig } from "@/features/net-worth/utils/config/filterConfig";

const NetWorthGraphHeader = ({
  graphConfigs,
}: NetWorthGraphHeaderProps) => {
  const filterRef = useRef<HTMLDivElement>(null);
  return (
    <GraphSummaryHeader graphConfigs={graphConfigs}>
      <GraphHeader label={"Net Worth"} />
      <GraphFilterButtonWithModal
        filterConfig={filterConfig}
        ref={filterRef}
        className="grid grid-cols-2"
      />
      {graphConfigs.map((graphConfig, index) => {
        const { lineConfig } = graphConfig;
        const { primaryTextColor } =
          getDirectionalColorsByLineConfig(lineConfig);
        return (
          <div key={index} className="flex flex-col">
            <Value
              graphConfig={graphConfig}
              className={`${graphConfigs.length > 1 ? "text-[1.2rem]" : ""}`}
            />
            <ValueChange
              graphConfig={graphConfig}
              className="text-[0.7rem]"
              style={{ color: primaryTextColor }}
            />
            <TotalYears
              graphConfig={graphConfig}
              className="text-[0.7rem]"
            />
          </div>
        );
      })}
    </GraphSummaryHeader>
  );
};

export default NetWorthGraphHeader;
