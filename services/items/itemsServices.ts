import { API_URL } from "@/utils/global-variables/globals";

/**
 * Removes an item by its unique identifier.
 *
 * This function sends a POST request to the Plaid API to remove an item
 * associated with the provided `item_id`. The request includes the `item_id`
 * in the body as a JSON payload.
 *
 * @param item_id - The unique identifier of the item to be removed.
 * @returns A promise that resolves to the JSON response from the server.
 *
 * @throws Will throw an error if the fetch request fails or the server
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

const itemService = {
  removeItem,
};

export default itemService;
