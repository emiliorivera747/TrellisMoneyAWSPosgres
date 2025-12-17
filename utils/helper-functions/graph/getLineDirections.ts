import { getLineDirection } from "@/utils/helper-functions/graph/getLineDirection";
import { SecurityData } from "@/features/projected-net-worth/types/graphComponents";
interface GetLineDirections {
    data1: SecurityData[];
    data2: SecurityData[];
}

export function getLineDirections({data1, data2}: GetLineDirections){
    const directionLine1 = getLineDirection(data1);
    const directionLine2 = getLineDirection(data2) ;
    return {directionLine1, directionLine2};
}