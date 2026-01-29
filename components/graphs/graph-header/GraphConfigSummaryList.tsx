// Components
import {
  Value,
} from "@/components/graphs/graph-header/HeaderTimeValueGraph";

// Types
import { GraphConfigSummaryListProps } from "@/types/components/admin/graphs/props";

// Components
import ValueChangeWithYears from "./ValueChangeWithYears";

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
            <ValueChangeWithYears
              graphConfig={graphConfig}
              primaryTextColor={primaryTextColor}
            />
          </div>
        );
      })}
    </div>
  );
};

export default GraphConfigSummaryList;
