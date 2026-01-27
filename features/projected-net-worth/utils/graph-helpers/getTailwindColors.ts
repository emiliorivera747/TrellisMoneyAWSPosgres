import { getColorBasedOnLineDirection } from "@/utils/helper-functions/graph/getColorBasedOnLineDirection";
import { LineSeriesConfig } from "@/types/components/admin/graphs/data";
import { Direction } from "@/features/projected-net-worth/types/graphComponents";

/**
 *
 *  Get the tailwind colors based on the line direction
 *
 * @param direction
 * @returns
 */
export const getTailwindColors = (
  direction: Direction,
  dataForLines: LineSeriesConfig
) => {
  return {
    lineColor: getColorBasedOnLineDirection({
      direction,
      upColor: dataForLines?.colorConfig?.lineColor?.upColor ?? "#74b816",
      downColor: dataForLines?.colorConfig?.lineColor?.downColor ?? "#e03131",
      flatColor: dataForLines?.colorConfig?.lineColor?.flatColor ?? "#495057",
    }),
    tailwindTagTextColor: getColorBasedOnLineDirection({
      direction,
      upColor: dataForLines?.colorConfig?.tagTextColor?.upColor ?? "#2f9e44",
      downColor: dataForLines?.colorConfig?.tagTextColor?.downColor ?? "#e03131",
      flatColor: dataForLines?.colorConfig?.tagTextColor?.flatColor ?? "#495057",
    }),
    tailwindTagBgColor: getColorBasedOnLineDirection({
      direction,
      upColor: dataForLines?.colorConfig?.tagBgColor?.upColor ?? "#d3f9d8",
      downColor: dataForLines?.colorConfig?.tagBgColor?.downColor ?? "#ffe0e0",
      flatColor: dataForLines?.colorConfig?.tagBgColor?.flatColor ?? "#f1f3f5",
    }),
    tailwindPrimaryTextColor: getColorBasedOnLineDirection({
      direction,
      upColor: dataForLines?.colorConfig?.subheaderColor?.upColor ?? "#74b816",
      downColor: dataForLines?.colorConfig?.subheaderColor?.downColor ?? "#e03131",
      flatColor: dataForLines?.colorConfig?.subheaderColor?.flatColor ?? "#495057",
    }),
  };
};
