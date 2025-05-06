import { API_URL } from "@/utils/global-variables/globals";

/**
 *  Delete the item with the given item id.
 */
const deleteItem = async (itemId: string) => {
  const response = await fetch(`${API_URL}/plaid/items/${itemId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("Failed to delete item");
  }

  return response.json();
};

const itemService = {
  deleteItem,
};

export default itemService;
