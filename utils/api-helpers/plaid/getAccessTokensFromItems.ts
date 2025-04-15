import { ItemPrisma } from "@/types/prisma";

/**
 *
 * Get all of the access tokens in the items array.
 *
 * @param items
 * @returns
 */
export const getAllAccessTokens = async (items: ItemPrisma[]) => {
  const accessTokens = items
    .map((item) => item.access_token)
    .filter((token): token is string => token !== null && token !== undefined);
  return accessTokens;
};
