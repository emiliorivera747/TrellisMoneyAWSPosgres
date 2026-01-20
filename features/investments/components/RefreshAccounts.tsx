"use client";
import { API_URL } from "@/utils/global-variables/globals";

/**
 * RefreshInvestments component renders a button that triggers an API call
 * to refresh investment account holdings.
 *
 * @returns A button element that, when clicked, sends a POST request to refresh data.
 */
const RefreshInvestments = () => {
  const refetchAccounts = async () => {
    fetch(`${API_URL}/household/investments/refresh`, { method: "POST" });
  };

  return (
    <button
      className="border px-4 py-2 rounded-full"
      onClick={() => refetchAccounts()}
    >
      Refresh
    </button>
  );
};

export default RefreshInvestments;
