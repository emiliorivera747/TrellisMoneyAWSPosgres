import { getColorBasedOnLineDirection } from "@/utils/helper-functions/getColorBasedOnLineDirection";
import { LinePayload } from "@/types/graphs";
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
  dataForLines: LinePayload
) => {
  return {
    lineColor: getColorBasedOnLineDirection({
      direction,
      upColor: dataForLines.lineColor?.upColor ?? "text-green-700",
      downColor: dataForLines.lineColor?.downColor ?? "text-red-700",
      flatColor: dataForLines.lineColor?.flatColor ?? "text-secondary-900",
    }),
    tailwindTagTextColor: getColorBasedOnLineDirection({
      direction,
      upColor: dataForLines.tagTextColor?.upColor ?? "text-green-700",
      downColor: dataForLines.tagTextColor?.downColor ?? "text-red-700",
      flatColor: dataForLines.tagTextColor?.flatColor ?? "text-secondary-900",
    }),
    tailwindTagBgColor: getColorBasedOnLineDirection({
      direction,
      upColor: dataForLines.tagBgColor?.upColor ?? "bg-green-100",
      downColor: dataForLines.tagBgColor?.downColor ?? "bg-red-100",
      flatColor: dataForLines.tagBgColor?.flatColor ?? "bg-secondary-100",
    }),
    tailwindPrimaryTextColor: getColorBasedOnLineDirection({
      direction,
      upColor: dataForLines.subheaderColor?.upColor ?? "text-green-700",
      downColor: dataForLines.subheaderColor?.downColor ?? "text-red-700",
      flatColor: dataForLines.subheaderColor?.flatColor ?? "text-secondary-900",
    }),
  };
};
