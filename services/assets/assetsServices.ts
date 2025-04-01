import { API_URL } from "@/utils/global-variables/globals";
import { Holding} from "@/types/plaid";
import { FinancialAssets } from "@/features/projected-financial-assets/types/projectedAssets";

const updateUserAssets = async (data: Holding) => {
  const response = await fetch(`${API_URL}/assets`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  return response.json();
};


const updateAccount = async (data: Holding) => {
  const response = await fetch(`${API_URL}/accounts/${data.account_id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  return response.json();
};

const updateAllAssets = async (data: FinancialAssets[]) => {
  const response = await fetch(`${API_URL}/assets`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  return response.json();
};

const assetService = {
  updateUserAssets,
  updateAccount,
  updateAllAssets,
};
export default assetService;
