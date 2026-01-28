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
  lineConfigs,
  tooltipConfigs,
}: NetWorthGraphHeaderProps) => {
  const filterRef = useRef<HTMLDivElement>(null);
  return (
    <GraphSummaryHeader
      lineConfigs={lineConfigs}
      tooltipConfigs={tooltipConfigs || []}
    >
      <GraphHeader label={"Net Worth"} />
      {lineConfigs.map((lineConfig, index) => {
        const { primaryTextColor } =
          getDirectionalColorsByLineConfig(lineConfig);
        return (
          <div key={index} className="flex flex-col">
            <Value
              lineIndex={index}
              className={`${lineConfigs.length > 1 ? "text-[1.2rem]" : ""}`}
            />
            <ValueChange
              lineIndex={index}
              className="text-[0.7rem]"
              style={{ color: primaryTextColor }}
            />
            <TotalYears lineIndex={index} className="text-[0.7rem]" />
          </div>
        );
      })}

      <div className="flex justify-end">
        <GraphFilterButtonWithModal
          filterConfig={filterConfig}
          ref={filterRef}
          className="grid grid-cols-2"
        />
      </div>
    </GraphSummaryHeader>
  );
};

export default NetWorthGraphHeader;
