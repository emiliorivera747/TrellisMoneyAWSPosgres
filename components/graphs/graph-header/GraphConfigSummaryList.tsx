// Components
import { Value } from "@/components/graphs/graph-header/HeaderTimeValueGraph";
import ValueChangeWithYears from "./ValueChangeWithYears";

// Types
import { GraphConfigSummaryListProps } from "@/types/components/admin/graphs/props";

// Utils
import { cn } from "@/lib/utils";

const defaultClassName = "grid grid-cols-[16rem_16rem]";

/**
 * Renders a grid of graph configuration summaries, displaying the current value
 * and value change with duration for each configuration.
 *
 * @param graphConfigs - Array of graph configurations to display
 * @param className - Optional additional CSS classes to apply to the container
 */
const GraphConfigSummaryList = ({
  graphConfigs,
  className,
}: GraphConfigSummaryListProps) => {
  return (
    <div className={cn(defaultClassName, className)}>
      {graphConfigs.map((graphConfig, index) => (
        <div key={index} className="flex flex-col">
          <Value
            graphConfig={graphConfig}
            className={`${graphConfigs.length > 1 ? "text-[1.2rem]" : ""}`}
          />
          <ValueChangeWithYears graphConfig={graphConfig} />
        </div>
      ))}
    </div>
  );
};

export default GraphConfigSummaryList;
