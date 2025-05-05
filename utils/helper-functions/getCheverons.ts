import { GetSvgV2 } from "@/utils/helper-functions/GetSvgV2";

export const cheveronDown = () => {
    return GetSvgV2({
      path: "m19.5 8.25-7.5 7.5-7.5-7.5",
      strokeWidth: 1.5,
      size: "size-4",
    });
  };
  

export const cheveronUp = () => {
    return GetSvgV2({
      path: "m4.5 15.75 7.5-7.5 7.5 7.5",
      strokeWidth: 1.5,
      size: "size-4",
    });
  };