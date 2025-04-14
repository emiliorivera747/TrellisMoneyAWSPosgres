import { Item } from "@/types/plaid";

/**
 *
 * Get all of the access tokens in the items array.
 *
 * @param items
 * @returns
 */
export const getAllAccessTokens = async (items: Item[]) => {
  const accessTokens = items
    .map((item) => item.access_token)
    .filter((token): token is string => token !== null && token !== undefined);
  return accessTokens;
};
