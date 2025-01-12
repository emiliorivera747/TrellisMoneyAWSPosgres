import React from "react";
import { GetSvgV2 } from "@/utils/helper-functions/GetSvgV2";
import {
  InflationCategory,
  InflationTagProps,
} from "@/features/projected-net-worth/types/inflationTagComponent";

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
  inflation_category = "flat",
  bg_color = "bg-gray-200",
  text_color = "text-black",
  svg_color = "black",
}: InflationTagProps) => {
  return (
    <div
      className={`flex items-center p-[0.3rem] px-3 rounded-full font-semibold gap-2 text-[0.6rem] ${bg_color} ${text_color}`}
    >
      {GetSvgV2({
        path: getSvgPath(inflation_category),
        strokeWidth: 3,
        size: "size-3",
        color: svg_color,
      })}
      {getLabel(inflation_category)}
    </div>
  );
};

export default InflationTag;
