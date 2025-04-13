import { Item } from "@/types/plaid";
import { client } from "@/config/plaidClient";
import { AccountBase } from "plaid";

/**
 * Fetch all of the accounts associated with the access tokens
 * in the items array.
 *
 * @param items
 * @returns
 */
export const getAccounts = async (items: Item[]): Promise<AccountBase[][]> => {

  // Get all access tokens from items
  const accessTokens = await getAllAccessTokens(items); 

  // Get all of the accounts associated with the access tokens and add corresponding item_id
  const accounts = await Promise.all(
    accessTokens.map(async (token, index) => {
      const response = await client.accountsGet({ access_token: token });
      return response.data.accounts.map((account) => ({
        ...account,
        item_id: items[index].item_id,
      }));
    })
  );
  return accounts;
};

/**
 *
 * Get all of the access tokens in the items array.
 *
 * @param items
 * @returns
 */
const getAllAccessTokens = async (items: Item[]) => {
  const accessTokens = items
    .map((item) => item.access_token)
    .filter((token): token is string => token !== null && token !== undefined);
  return accessTokens;
};
