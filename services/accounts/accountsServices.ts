import { API_URL } from "@/utils/global-variables/globals";

/**
 * Function to refresh household accounts.
 *
 * @returns Promise with the response data
 */
const refreshAccounts = async () => {
  const response = await fetch(`${API_URL}/household/accounts/refresh`, {
    method: "POST",
  });
  return response.json();
};

const accountsService = {
  refreshAccounts,
};

export default accountsService;
