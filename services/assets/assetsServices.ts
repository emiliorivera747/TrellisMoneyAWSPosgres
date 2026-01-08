import { API_URL } from "@/utils/global-variables/globals";
import { Holding} from "@/types/plaid";
import {  ProjectedAsset } from "@/features/projected-financial-assets/types/projectedAssets";

/**
 * Function to update user asset.
 * 
 * @param data - The data to be sent in the request body.
 * @returns 
 */
const updateUserAsset = async (data: Holding) => {
  const response = await fetch(`${API_URL}/assets`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  return response.json();
};

/**
 * 
 * Function to update account.
 * 
 * @param data 
 * @returns 
 */
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

/**
 * Function to update all assets.
 * 
 * @param data - The data to be sent in the request body.
 * @returns 
 */
const updateAllAssets = async (data: ProjectedAsset[]) => {
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
  updateUserAsset,
  updateAccount,
  updateAllAssets,
};


export default assetService;
