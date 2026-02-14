import { API_URL } from "@/utils/global-variables/globals";

// Types
import { ApiResponse } from "@/types/services/responses/api-responses";
import { HoldingsResponse } from "@/types/services/responses/holdings";
import { AggregateHoldingDetails } from "@/types/api-routes/holding/holding";
import { HoldingHistoryData } from "@/app/api/investments/holding-history/[securityId]/route";

/**
 * Fetches investment holdings from the API with the current timestamp.
 * @export
 * @returns {Promise<ApiResponse<HoldingsResponse>>} A promise that resolves to the holdings response.
 */
const getHoldings = async (): Promise<ApiResponse<HoldingsResponse>> => {
  const timestamp = new Date().toISOString();

  const res = await fetch(
    `${API_URL}/investments/holdings?timestamp=${timestamp}`
  );
  if (!res.ok) throw new Error("Error fetching investment holdings data");
  const data: ApiResponse<HoldingsResponse> = await res.json();
  return data;
};

/**
 * Fetches aggregate holdings for a specific security from the API.
 * @export
 * @param {string} securityId - The security ID to fetch aggregate holdings for.
 * @returns {Promise<ApiResponse<AggregateHoldingDetails>>} A promise that resolves to the aggregate holdings response.
 */
const getAggregateHoldings = async (
  securityId: string
): Promise<ApiResponse<AggregateHoldingDetails>> => {
  const timestamp = new Date().toISOString();

  const res = await fetch(
    `${API_URL}/household/v1/aggregate-holdings/${securityId}?timestamp=${timestamp}`,
    {
      method: "GET",
      cache: "no-store",
    }
  );
  if (!res.ok) throw new Error("Error fetching aggregate holdings data");
  const data: ApiResponse<AggregateHoldingDetails> = await res.json();
  return data;
};

const getHoldingHistory = async (
  securityId: string
): Promise<ApiResponse<{ securityId: string; history: HoldingHistoryData[] }>> => {
  const timestamp = new Date().toISOString();

  const res = await fetch(
    `${API_URL}/investments/holding-history/${securityId}?timestamp=${timestamp}`,
    {
      method: "GET",
      cache: "no-store",
    }
  );
  if (!res.ok) throw new Error("Error fetching holding history data");
  const data: ApiResponse<{ securityId: string; history: HoldingHistoryData[] }> =
    await res.json();
  return data;
};

export const holdingService = {
  getHoldings,
  getAggregateHoldings,
  getHoldingHistory,
};
