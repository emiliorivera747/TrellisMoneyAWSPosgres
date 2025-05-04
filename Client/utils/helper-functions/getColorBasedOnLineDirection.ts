type Direction = "up" | "down" | "flat";

interface ColorBasedOnLineDirection {
  upColor: string;
  downColor: string;
  flatColor: string;
  direction: Direction;
}

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
