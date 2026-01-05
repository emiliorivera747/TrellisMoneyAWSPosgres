import { API_URL } from "@/utils/global-variables/globals";
import { Account } from "@/app/generated/prisma/client";

const fetchInvestments = async (): Promise<ApiResponse<Account[]>> => {
  const timestamp = new Date().toISOString();

  const res = await fetch(
    `${API_URL}/investments/holdings?timestamp=${timestamp}`
  );
  if (!res.ok) throw new Error("Error fetching investment holdings data");
  const data: ApiResponse<Account[]> = await res.json();
  return data;
};

export const investmentService = {
  fetchInvestments,
};
