import { ItemPrisma } from "@/types/prisma";
import { client } from "@/config/plaidClient";
import { AccountBaseWithItemId } from "@/types/plaid";
import { getAllAccessTokens } from "@/utils/api-helpers/plaid/getAccessTokensFromItems";

/**
 * Fetch all of the accounts associated with the access tokens
 * in the items array.
 *
 * @param items
 * @returns
 */
export const getAccounts = async (
  items: ItemPrisma[]
): Promise<AccountBaseWithItemId[][]> => {
  
  // Get all access tokens from items
  const accessTokens = await getAllAccessTokens(items);

  // Get all of the accounts associated with the access tokens and add corresponding item_id
  const accounts = await Promise.all(
    accessTokens.map(async (token) => {
      const response = await client.accountsGet({ access_token: token });
      console.log("Full Accounts Response:", JSON.stringify(response.data, null, 2));
      return response.data.accounts.map((account) => ({
        ...account,
        item_id: response.data.item.item_id,
      }));
    })
  );

  console.log("Accounts", accounts);

  return accounts;
};
