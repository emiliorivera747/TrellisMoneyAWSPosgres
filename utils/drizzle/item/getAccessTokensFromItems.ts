import { Item } from "@/drizzle/schema";

/**
 *
 * Get all of the access tokens in the items array.
 *
 * @param items
 * @returns
 */
export const getAllAccessTokens = (items: Item[]) => {
  const accessTokens = items
    .map((item) => item.accessToken)
    .filter((token): token is string => token !== null && token !== undefined);
  return accessTokens;
};
