import { ItemRemoveRequest } from "plaid";
import { client } from "@/config/plaidClient";

/**
 * Removes an item from Plaid using the provided access token.
 *
 * @param accessToken - The access token associated with the item to be removed.
 * @returns A promise that resolves to the response from the Plaid API after the item is removed.
 */
export const removeItemFromPlaid = async (accessToken: string) => {
  const request: ItemRemoveRequest = {
    access_token: accessToken,
  };
  const res = await client.itemRemove(request);
  return res;
};
