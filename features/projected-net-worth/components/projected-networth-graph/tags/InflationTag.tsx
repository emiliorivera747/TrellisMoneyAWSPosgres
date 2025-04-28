import React from "react";
import { GetSvgV2 } from "@/utils/helper-functions/GetSvgV2";
import {
  InflationCategory,
  InflationTagProps,
} from "@/features/projected-net-worth/types/inflationTagComponent";

// Functions
import { getLineDirection } from "@/utils/helper-functions/getLineDirection";
import { getTailwindColors } from "@/features/projected-net-worth/utils/getTailwindColors";


const getSvgPath = (category: InflationCategory) => {
  switch (category) {
    case "up":
      return "m4.5 19.5 15-15m0 0H8.25m11.25 0v11.25";
    case "flat":
      return "M5 12h14";
    case "down":
      return "m19.5 4.5-15 15m0 0h11.25m-11.25 0V8.25";
    default:
      return "";
  }
};

const getLabel = (category: InflationCategory) => {
  switch (category) {
    case "up":
      return "Beats inflation";
    case "flat":
      return "Keeps up with inflation";
    case "down":
      return "Falls behind inflation";
    default:
      return "";
  }
};

const InflationTag = ({
  linePayload,
}: InflationTagProps) => {
  if (!linePayload) return null;
  const lineDirection = getLineDirection(linePayload.lineData);
  const { tailwindTagTextColor, tailwindTagBgColor } = getTailwindColors(
    lineDirection,
    linePayload
  );

  return (
    <div
      className={`flex items-center p-[0.3rem] px-3 rounded-full font-semibold gap-2 text-[0.6rem] ${tailwindTagBgColor} ${tailwindTagTextColor}`}
    >
      {GetSvgV2({
        path: getSvgPath(lineDirection),
        strokeWidth: 3,
        size: "size-3",
        color: "currentColor",
      })}
      {getLabel(lineDirection)}
    </div>
  );
};

export default InflationTag;
