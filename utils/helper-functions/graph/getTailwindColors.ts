import { getColorBasedOnLineDirection } from "@/utils/helper-functions/graph/getColorBasedOnLineDirection";
import { LinePayload } from "@/types/graphs";
import { getLineDirection } from "@/utils/helper-functions/graph/getLineDirection";

/**
 *
 *  Get the tailwind colors based on the line direction
 *
 * @param direction
 * @returns
 */
export const getTailwindColors = (payloadForLine: LinePayload) => {
  
  const direction = getLineDirection(payloadForLine.lineData);

  return {
    lineColor: getColorBasedOnLineDirection({
      direction,
      upColor:
        payloadForLine?.colorConfig?.lineColor?.upColor ?? "text-green-700",
      downColor:
        payloadForLine?.colorConfig?.lineColor?.downColor ?? "text-red-700",
      flatColor:
        payloadForLine?.colorConfig?.lineColor?.flatColor ??
        "text-secondary-900",
    }),
    tagTextColorTW: getColorBasedOnLineDirection({
      direction,
      upColor:
        payloadForLine?.colorConfig?.tagTextColor?.upColor ?? "text-green-700",
      downColor:
        payloadForLine?.colorConfig?.tagTextColor?.downColor ?? "text-red-700",
      flatColor:
        payloadForLine?.colorConfig?.tagTextColor?.flatColor ??
        "text-secondary-900",
    }),
    tagBgColorTW: getColorBasedOnLineDirection({
      direction,
      upColor:
        payloadForLine?.colorConfig?.tagBgColor?.upColor ?? "bg-green-100",
      downColor:
        payloadForLine?.colorConfig?.tagBgColor?.downColor ?? "bg-red-100",
      flatColor:
        payloadForLine?.colorConfig?.tagBgColor?.flatColor ??
        "bg-secondary-100",
    }),
    primaryTextColorTW: getColorBasedOnLineDirection({
      direction,
      upColor:
        payloadForLine?.colorConfig?.subheaderColor?.upColor ??
        "text-green-700",
      downColor:
        payloadForLine?.colorConfig?.subheaderColor?.downColor ??
        "text-red-700",
      flatColor:
        payloadForLine?.colorConfig?.subheaderColor?.flatColor ??
        "text-secondary-900",
    }),
  };
};
