import { client } from "@/config/plaidClient";
import { AccountBase } from "plaid";
import { Item } from "@/drizzle/schema";

/**
 * Fetch all of the accounts associated with the access tokens
 * in the items array.
 *
 * @param items
 * @returns
 */
export const getAccounts = async (
  items: Pick<Item, "itemId">[]
): Promise<AccountBase[][]> => {
  // Get all access tokens from items
  const accessTokens = items.map((item) => item.itemId);

  // Get all of the accounts associated with the access tokens and add corresponding item_id
  const accounts = await Promise.all(
    accessTokens.map(async (token: string) => {
      const response = await client.accountsGet({ access_token: token });
      return response.data.accounts.map((account) => ({
        ...account,
        item_id: response.data.item.item_id,
      }));
    })
  );
  return accounts;
};

/**
 * Fetch all of the accounts associated with the access tokens
 * in the items array.
 *
 * @param items
 * @returns
 */
export const getAccountsFromPlaidWithItems = async (
  items: Pick<Item, "itemId">[]
): Promise<AccountBase[][]> => {
  const accessTokens = items.map((item) => item.itemId);
  const accounts = await Promise.all(
    accessTokens.map(async (token: string) => {
      const response = await client.accountsGet({ access_token: token });
      return response.data.accounts.map((account) => ({
        ...account,
        item_id: response.data.item.item_id,
      }));
    })
  );

  return accounts;
};
