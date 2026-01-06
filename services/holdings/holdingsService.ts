import { API_URL } from "@/utils/global-variables/globals";

// Types
import { ApiResponse } from "@/types/api-responses";
import { HoldingsResponse } from "@/types/services-responses/holdings";

// Fetches investment holdings from the API with the current timestamp.
const getHoldings = async (): Promise<ApiResponse<HoldingsResponse>> => {
  const timestamp = new Date().toISOString();

  const res = await fetch(
    `${API_URL}/investments/holdings?timestamp=${timestamp}`
  );
  if (!res.ok) throw new Error("Error fetching investment holdings data");
  const data: ApiResponse<HoldingsResponse> = await res.json();
  return data;
};

export const holdingService = {
  getHoldings,
};
