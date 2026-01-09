// import { Item } from "@/app/generated/prisma/client";

/**
 *
 * Get all of the access tokens in the items array.
 *
 * @param items
 * @returns
 */
export const getAllAccessTokens = (items: Item[]) => {
  const accessTokens = items
    .map((item) => item.access_token)
    .filter((token): token is string => token !== null && token !== undefined);
  return accessTokens;
};
