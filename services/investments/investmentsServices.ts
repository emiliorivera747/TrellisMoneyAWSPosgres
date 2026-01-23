import { API_URL } from "@/utils/global-variables/globals";

/**
 * Function to refresh investment account holdings.
 *
 * @returns Promise with the response data
 */
const refreshInvestments = async () => {
  const response = await fetch(`${API_URL}/household/investments/refresh`, {
    method: "POST",
  });
  return response.json();
};

const investmentsService = {
  refreshInvestments,
};

export default investmentsService;
