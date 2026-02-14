import { NextRequest } from "next/server";
import { withAuth } from "@/lib/protected";
import {
  SuccessResponse,
  ErrorResponse,
} from "@/utils/api-helpers/api-responses/response";

export interface HoldingHistoryData {
  date: string;
  value: number;
}

/**
 * Generates dummy historical price data for a holding.
 * Simulates realistic stock-like price movements over the past 2 years.
 */
function generateDummyHoldingHistory(): HoldingHistoryData[] {
  const history: HoldingHistoryData[] = [];
  const now = new Date();
  const twoYearsAgo = new Date(now);
  twoYearsAgo.setFullYear(now.getFullYear() - 2);

  let value = 100 + Math.random() * 50;

  for (
    let date = new Date(twoYearsAgo);
    date <= now;
    date.setDate(date.getDate() + 1)
  ) {
    const dailyChange = (Math.random() - 0.48) * 3;
    value = Math.max(10, value + dailyChange);

    history.push({
      date: new Date(date).toISOString().split("T")[0],
      value: parseFloat(value.toFixed(2)),
    });
  }

  return history;
}

/**
 * GET /api/investments/holding-history/[securityId]
 * Returns historical price data for a specific holding/security.
 * Currently returns dummy data for development purposes.
 */
export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ securityId: string }> }
) {
  return withAuth(req, async () => {
    try {
      const { securityId } = await params;
      const history = generateDummyHoldingHistory();

      return SuccessResponse(
        { securityId, history },
        "Holding history fetched successfully"
      );
    } catch (error) {
      return ErrorResponse(error);
    }
  });
}
