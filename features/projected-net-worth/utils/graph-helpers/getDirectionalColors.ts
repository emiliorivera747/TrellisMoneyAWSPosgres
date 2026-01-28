import { LineSeriesConfig } from "@/types/components/admin/graphs/data";
import { Direction } from "@/features/projected-net-worth/types/graphComponents";

// Data
import { DEFAULT_COLORS } from "@/features/projected-net-worth/utils/data/defaultColors";

/**
 *
 *  Get the colors based on the line direction
 *
 * @param direction
 * @returns
 */
export const getDirectionalColors = (
  direction: Direction,
  lineConfig: LineSeriesConfig
) => {
  const getColor = (key: keyof typeof DEFAULT_COLORS) => {
    const colorConfig = lineConfig?.colorConfig?.[key];
    const defaults = DEFAULT_COLORS[key];

    const upColor = colorConfig?.upColor ?? defaults.upColor;
    const downColor = colorConfig?.downColor ?? defaults.downColor;
    const flatColor = colorConfig?.flatColor ?? defaults.flatColor;

    if (direction === "up") return upColor;
    if (direction === "down") return downColor;
    return flatColor;
  };

  return {
    lineColor: getColor("lineColor"),
    tagTextColor: getColor("tagTextColor"),
    tagBgColor: getColor("tagBgColor"),
    primaryTextColor: getColor("subheaderColor"),
  };
};
