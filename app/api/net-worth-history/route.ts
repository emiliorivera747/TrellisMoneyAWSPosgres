import { NextRequest } from "next/server";
import { db } from "@/drizzle/db";
import { eq, asc } from "drizzle-orm";
import { netWorthSnapshot } from "@/drizzle/schema";
import { withAuth } from "@/lib/protected";
import {
  SuccessResponse,
  FailResponse,
  ErrorResponse,
} from "@/utils/api-helpers/api-responses/response";
import { getMemberByUserId } from "@/utils/drizzle/household/household";

export interface NetWorthHistoryData {
  date: string;
  netWorth: number;
  totalAssets: number;
  totalLiabilities: number;
}

/**
 * GET /api/net-worth-history
 * Fetches historical net worth snapshots for the user's household.
 * Returns data sorted by snapshot date in ascending order.
 */
export async function GET(req: NextRequest) {
  return withAuth(req, async (_request, user) => {
    try {
      const member = await getMemberByUserId(user.id);
      if (!member?.householdId) {
        return FailResponse("Household not found for user", 404);
      }

      const snapshots = await db
        .select({
          snapshotDate: netWorthSnapshot.snapshotDate,
          netWorth: netWorthSnapshot.netWorth,
          totalAssets: netWorthSnapshot.totalAssets,
          totalLiabilities: netWorthSnapshot.totalLiabilities,
        })
        .from(netWorthSnapshot)
        .where(eq(netWorthSnapshot.householdId, member.householdId))
        .orderBy(asc(netWorthSnapshot.snapshotDate));

      const historyData: NetWorthHistoryData[] = snapshots.map((snapshot) => ({
        date: snapshot.snapshotDate,
        netWorth: Number(snapshot.netWorth),
        totalAssets: Number(snapshot.totalAssets),
        totalLiabilities: Number(snapshot.totalLiabilities),
      }));

      return SuccessResponse(
        { history: historyData },
        "Net worth history fetched successfully"
      );
    } catch (error) {
      return ErrorResponse(error);
    }
  });
}