"use client";
import { API_URL } from "@/utils/global-variables/globals";

const RefreshAccounts = () => {
  const refetchAccounts = async () => {
    fetch(`${API_URL}/household/accounts/refresh`, { method: "POST" });
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

export default RefreshAccounts;
