import { getLineDirection } from "@/utils/helper-functions/graph/getLineDirection";
import { TimeSeriesData } from "@/types/components/admin/graphs/data";
interface GetLineDirections {
    data1: TimeSeriesData[];
    data2: TimeSeriesData[];
}

export function getLineDirections({data1, data2}: GetLineDirections){
    const directionLine1 = getLineDirection(data1);
    const directionLine2 = getLineDirection(data2) ;
    return {directionLine1, directionLine2};
}