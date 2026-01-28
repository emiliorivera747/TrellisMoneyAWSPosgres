import { useRef } from "react";

// Components
import TimeValueGraphHeader, {
  Value,
  ValueChangeHeader,
  TotalYears,
} from "@/components/dashboard/HeaderTimeValueGraph";
import GraphHeader from "@/components/headers/GraphHeader";
import GraphFilterButtonWithModal from "@/components/buttons/GraphFilterButtonWithModal";

// Types
import { LineSeriesConfig } from "@/types/components/admin/graphs/data";
import { TooltipConfig } from "@/types/components/admin/graphs/tooltips";
import { NetWorthGraphHeaderProps } from "@/features/net-worth/types/net-worth-graph-header";

// Utils
import { getLineDirection } from "@/utils/helper-functions/graph/getLineDirection";
import { getDirectionalColors } from "@/features/projected-net-worth/utils/graph-helpers/getDirectionalColors";

// Config
import { filterConfig } from "@/features/net-worth/utils/config/filterConfig";

const NetWorthGraphHeader = ({
  lineConfigs,
  tooltipConfigs,
}: NetWorthGraphHeaderProps) => {
  const filterRef = useRef<HTMLDivElement>(null);
  return (
    <TimeValueGraphHeader
      lineConfigs={lineConfigs}
      tooltipConfigs={tooltipConfigs || []}
    >
      <div className="grid grid-cols-2 w-full">
        <div className={"grid grid-cols-[14rem_14rem]"}>
          {lineConfigs.map((linePayload, index) => {
            const direction = getLineDirection(linePayload.data);
            const { primaryTextColor } = getDirectionalColors(
              direction,
              linePayload
            );
            return (
              <div key={index} className="flex flex-col">
                <div className="flex">
                  <div className="flex items-center">
                    <GraphHeader label={"Net Worth"} />
                  </div>
                </div>
                <Value
                  lineIndex={index}
                  className={`${payloadLen > 1 ? "text-[1.2rem]" : ""}`}
                />
                <div className="flex gap-1">
                  <ValueChangeHeader
                    lineIndex={index}
                    className="text-[0.7rem]"
                    style={{ color: primaryTextColor }}
                  />
                  <TotalYears lineIndex={index} className="text-[0.7rem]" />
                </div>
              </div>
            );
          })}
        </div>
        <div className="flex justify-end">
          <GraphFilterButtonWithModal
            filterConfig={filterConfig}
            ref={filterRef}
            className="grid grid-cols-2"
          />
        </div>
      </div>
    </TimeValueGraphHeader>
  );
};

export default NetWorthGraphHeader;
