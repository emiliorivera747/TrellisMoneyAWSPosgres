import { API_URL } from "@/utils/global-variables/globals";

/**
 * Plaid service to get identity
 */
const getFinancialAssets = async (
  start_year: number,
  end_year: number,
  includes_inflation: boolean
) => {
  const response = await fetch(
    `${API_URL}/plaid/generate-financial-assets?start_date=${start_year}&end_date=${end_year}&includes_inflation=${includes_inflation}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ timestamp: new Date().toISOString() }),
    }
  );
  return response.json();
};

const fincialAssetServices = {
  getFinancialAssets,
};

export default fincialAssetServices;
