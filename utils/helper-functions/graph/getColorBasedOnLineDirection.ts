import { ColorBasedOnLineDirection } from "@/features/projected-net-worth/types/graphComponents";

export const getColorBasedOnLineDirection = ({
  direction,
  upColor,
  downColor,
  flatColor,
}: ColorBasedOnLineDirection) => {
  switch (direction) {
    case "up":
      return upColor;
    case "down":
      return downColor;
    default:
      return flatColor;
  }
};
