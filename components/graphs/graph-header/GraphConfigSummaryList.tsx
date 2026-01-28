// Components
import {
  Value,
  ValueChange,
  TotalYears,
} from "@/components/graphs/graph-header/HeaderTimeValueGraph";

// Types
import { GraphConfigSummaryListProps } from "@/types/components/admin/graphs/props";

// Utils
import { getDirectionalColorsByLineConfig } from "@/features/projected-net-worth/utils/graph-helpers/getDirectionalColors";
import { cn } from "@/lib/utils";

const defaultClassName = "grid grid-cols-[16rem_16rem]";

const GraphConfigSummaryList = ({
  graphConfigs,
  className,
}: GraphConfigSummaryListProps) => {
  return (
    <div className={cn(defaultClassName, className)}>
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
            <span className="flex gap-1">
              <ValueChange
                graphConfig={graphConfig}
                className="text-[0.7rem]"
                style={{ color: primaryTextColor }}
              />
              <TotalYears graphConfig={graphConfig} className="text-[0.7rem]" />
            </span>
          </div>
        );
      })}
    </div>
  );
};

export default GraphConfigSummaryList;
