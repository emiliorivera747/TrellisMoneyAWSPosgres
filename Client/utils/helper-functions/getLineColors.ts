import { getColorBasedOnLineDirection } from "@/utils/helper-functions/getColorBasedOnLineDirection";
import { Direction } from "@/features/projected-net-worth/types/graphComponents";

interface LineColor {
    upColor: string;
    downColor: string;
    flatColor: string;
    direction: Direction;
}

export const getLineColors = (lineColors: LineColor[]) => {
    return lineColors.map((lineColor) => {
        return getColorBasedOnLineDirection({direction: lineColor.direction, upColor: lineColor.upColor, downColor: lineColor.downColor, flatColor: lineColor.flatColor});
    });
};