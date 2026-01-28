import { getColorBasedOnLineDirection } from "@/utils/helper-functions/graph/getColorBasedOnLineDirection";
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
  dataForLines: LineSeriesConfig
) => {
  const getColor = (key: keyof typeof DEFAULT_COLORS) => {
    const config = dataForLines?.colorConfig?.[key];
    const defaults = DEFAULT_COLORS[key];

    return getColorBasedOnLineDirection({
      direction,
      upColor: config?.upColor ?? defaults.upColor,
      downColor: config?.downColor ?? defaults.downColor,
      flatColor: config?.flatColor ?? defaults.flatColor,
    });
  };

  return {
    lineColor: getColor("lineColor"),
    tagTextColor: getColor("tagTextColor"),
    tagBgColor: getColor("tagBgColor"),
    primaryTextColor: getColor("subheaderColor"),
  };
};
