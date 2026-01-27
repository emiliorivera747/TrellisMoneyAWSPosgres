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
      upColor: dataForLines?.colorConfig?.lineColor?.upColor ?? "text-green-700",
      downColor: dataForLines?.colorConfig?.lineColor?.downColor ?? "text-red-700",
      flatColor: dataForLines?.colorConfig?.lineColor?.flatColor ?? "text-secondary-900",
    }),
    tailwindTagTextColor: getColorBasedOnLineDirection({
      direction,
      upColor: dataForLines?.colorConfig?.tagTextColor?.upColor ?? "text-green-700",
      downColor: dataForLines?.colorConfig?.tagTextColor?.downColor ?? "text-red-700",
      flatColor: dataForLines?.colorConfig?.tagTextColor?.flatColor ?? "text-secondary-900",
    }),
    tailwindTagBgColor: getColorBasedOnLineDirection({
      direction,
      upColor: dataForLines?.colorConfig?.tagBgColor?.upColor ?? "bg-green-100",
      downColor: dataForLines?.colorConfig?.tagBgColor?.downColor ?? "bg-red-100",
      flatColor: dataForLines?.colorConfig?.tagBgColor?.flatColor ?? "bg-secondary-100",
    }),
    tailwindPrimaryTextColor: getColorBasedOnLineDirection({
      direction,
      upColor: dataForLines?.colorConfig?.subheaderColor?.upColor ?? "text-green-700",
      downColor: dataForLines?.colorConfig?.subheaderColor?.downColor ?? "text-red-700",
      flatColor: dataForLines?.colorConfig?.subheaderColor?.flatColor ?? "text-secondary-900",
    }),
  };
};
