import { prisma } from "@/lib/prisma";
import { Holding, Security} from "plaid";
import { SecurityHistory } from "@/types/prisma";
import { getValueOrDefault } from "@/utils/helper-functions/getValueOrDefaultValue";
import isoToUTC from "@/utils/api-helpers/isoToUTC";
import { Decimal } from "decimal.js";
import { HoldingHistory } from "@prisma/client";



/**
 * 
 * Upserts the holdings into the database and returns the holding history
 * 
 * @param holdings 
 * @param securities 
 * @param timestamp 
 * @param user_id 
 * @returns 
 */
const upserHoldings = async (
    holdings: Holding[],
    securities: Security[],
    timestamp: string,
    user_id: string
): Promise<HoldingHistory[] | []> => {

    const holdingHistory: HoldingHistory[] | [] = [];





    return holdingHistory;
}