import { NetWorthHistoryData } from "@/app/api/net-worth-history/route";

const API_URL = `${process.env.NEXT_PUBLIC_API_URL}`;

/**
 * Fetches the net worth from the API
 * @returns Net worth data
 */
const getNetWorth = async () => {
  const response = await fetch(`${API_URL}/net-worth`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response.json();
};

export interface NetWorthHistoryResponse {
  data: {
    history: NetWorthHistoryData[];
  };
  message: string;
}

/**
 * Fetches the historical net worth data from the API
 * @returns Historical net worth snapshots
 */
const getNetWorthHistory = async (): Promise<NetWorthHistoryResponse> => {
  const response = await fetch(`${API_URL}/net-worth-history`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response.json();
};

export const networthService = {
  getNetWorth,
  getNetWorthHistory,
};
