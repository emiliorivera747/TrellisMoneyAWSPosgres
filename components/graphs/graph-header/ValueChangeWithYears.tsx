import { ValueChange, TotalYears } from "./HeaderTimeValueGraph";
import { getDirectionalColorsByLineConfig } from "@/features/projected-net-worth/utils/graph-helpers/getDirectionalColors";

// Types
import { GraphConfig } from "@/types/components/admin/graphs/graph-config";

/**
 * Displays a compact summary of value change and time duration for a graph configuration.
 * Combines the ValueChange and TotalYears components in a horizontal layout.
 * Receives graphConfig as a prop for displaying value changes.
 */
const ValueChangeWithYears = ({ graphConfig }: { graphConfig: GraphConfig }) => {
  const { lineConfig } = graphConfig;
  const { primaryTextColor } = getDirectionalColorsByLineConfig(lineConfig);

  return (
    <span className="flex gap-1">
      <ValueChange
        graphConfig={graphConfig}
        className="text-[0.7rem]"
        style={{ color: primaryTextColor }}
      />
      <TotalYears graphConfig={graphConfig} className="text-[0.7rem]" />
    </span>
  );
};

export default ValueChangeWithYears;
