import { API_URL } from "@/utils/global-variables/globals";
import { GetItemsResponse } from "@/types/services-responses/items";

/**
 * Removes an item by its unique identifier.
 * This function sends a POST request to the Plaid API to remove an item
 * associated with the provided `item_id`. The request includes the `item_id`
 * in the body as a JSON payload.
 * @export
 * @param {string} item_id - The unique identifier of the item to be removed.
 * @returns {Promise<any>} A promise that resolves to the JSON response from the server.
 * @throws {Error} Will throw an error if the fetch request fails or the server
 *         returns an error response.
 */
const removeItem = async (item_id: string) => {
  const res = await fetch(`${API_URL}/plaid/items/remove`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ item_id }),
  });
  return res.json();
};

/**
 * Fetches all items from the API.
 * @export
 * @returns {Promise<GetItemsResponse>} A promise that resolves to the items response.
 * @throws {Error} Will throw an error if the fetch request fails.
 */
const getItems = async (): Promise<GetItemsResponse> => {
  const res = await fetch(`${API_URL}/plaid/items`);
  if (!res.ok)
    throw new Error(`HTTP error! Status: ${res.status} ${res.statusText}`);
  return res.json();
};

const itemService = {
  removeItem,
  getItems,
};

export default itemService;
