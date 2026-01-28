import { getColorBasedOnLineDirection } from "@/utils/helper-functions/graph/getColorBasedOnLineDirection";
import { LineSeriesConfig } from "@/types/components/admin/graphs/data";
import { getLineDirection } from "@/utils/helper-functions/graph/getLineDirection";

/**
 *
 *  Get the tailwind colors based on the line direction
 *
 * @param direction
 * @returns
 */
export const getDirectionalColors = (payloadForLine: LineSeriesConfig) => {

  const direction = getLineDirection(payloadForLine.data);

  return {
    lineColor: getColorBasedOnLineDirection({
      direction,
      upColor:
        payloadForLine?.colorConfig?.lineColor?.upColor ?? "#74b816",
      downColor:
        payloadForLine?.colorConfig?.lineColor?.downColor ?? "#e03131",
      flatColor:
        payloadForLine?.colorConfig?.lineColor?.flatColor ??
        "#495057",
    }),
   tagTextColorTW: getColorBasedOnLineDirection({
      direction,
      upColor:
        payloadForLine?.colorConfig?.tagTextColor?.upColor ?? "#2f9e44",
      downColor:
        payloadForLine?.colorConfig?.tagTextColor?.downColor ?? "#e03131",
      flatColor:
        payloadForLine?.colorConfig?.tagTextColor?.flatColor ??
        "#495057",
    }),
    tagBgColorTW: getColorBasedOnLineDirection({
      direction,
      upColor:
        payloadForLine?.colorConfig?.tagBgColor?.upColor ?? "#d3f9d8",
      downColor:
        payloadForLine?.colorConfig?.tagBgColor?.downColor ?? "#ffe0e0",
      flatColor:
        payloadForLine?.colorConfig?.tagBgColor?.flatColor ??
        "#f1f3f5",
    }),
    primaryTextColorTW: getColorBasedOnLineDirection({
      direction,
      upColor:
        payloadForLine?.colorConfig?.subheaderColor?.upColor ??
        "#74b816",
      downColor:
        payloadForLine?.colorConfig?.subheaderColor?.downColor ??
        "#e03131",
      flatColor:
        payloadForLine?.colorConfig?.subheaderColor?.flatColor ??
        "#495057",
    }),
  };
};
