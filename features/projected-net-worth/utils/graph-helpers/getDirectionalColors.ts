import { getColorBasedOnLineDirection } from "@/utils/helper-functions/graph/getColorBasedOnLineDirection";
import { LineSeriesConfig } from "@/types/components/admin/graphs/data";
import { Direction } from "@/features/projected-net-worth/types/graphComponents";

const DEFAULT_COLORS = {
  lineColor: { upColor: "#74b816", downColor: "#e03131", flatColor: "#495057" },
  tagTextColor: { upColor: "#2f9e44", downColor: "#e03131", flatColor: "#495057" },
  tagBgColor: { upColor: "#d3f9d8", downColor: "#ffe0e0", flatColor: "#f1f3f5" },
  subheaderColor: { upColor: "#74b816", downColor: "#e03131", flatColor: "#495057" },
} as const;

/**
 *
 *  Get the tailwind colors based on the line direction
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
    tailwindTagTextColor: getColor("tagTextColor"),
    tailwindTagBgColor: getColor("tagBgColor"),
    tailwindPrimaryTextColor: getColor("subheaderColor"),
  };
};
