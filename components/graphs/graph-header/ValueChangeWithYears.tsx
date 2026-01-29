import { ValueChange, TotalYears } from "./HeaderTimeValueGraph";
import { GraphConfigSummaryListProps } from "@/types/components/admin/graphs/props";

type ValueChangeWithYearsProps = {
  graphConfig: GraphConfigSummaryListProps["graphConfigs"][number];
  primaryTextColor: string;
};

const ValueChangeWithYears = ({
  graphConfig,
  primaryTextColor,
}: ValueChangeWithYearsProps) => (
  <span className="flex gap-1">
    <ValueChange
      graphConfig={graphConfig}
      className="text-[0.7rem]"
      style={{ color: primaryTextColor }}
    />
    <TotalYears graphConfig={graphConfig} className="text-[0.7rem]" />
  </span>
);

export default ValueChangeWithYears;
