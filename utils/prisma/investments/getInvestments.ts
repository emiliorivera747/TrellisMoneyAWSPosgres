import { getAllAccessTokens } from "@/utils/prisma/item/getAccessTokensFromItems";
import { updateHoldingsAndSecurities } from "@/utils/prisma/investments/updateHoldingsAndSecurities";
import { updateItem } from "@/utils/prisma/item/updateItems";
import { updateAccounts } from "@/utils/prisma/accounts/updateAccountsV2";

// Services
import { getAllHoldingsWithAccessTokens } from "@/services/plaid/holdings/holdings";

// Utils
import { updateHoldings } from "@/utils/prisma/holding/updateHoldings";

// Types
import { Account, Item } from "@/app/generated/prisma/client";
import { Holding } from "@/app/generated/prisma/client";
import {
  Holding as HoldingDB,
  Account as AccountDB,
} from "@/app/generated/prisma/browser";

/**
 * Fetch all of the investments associated with the access tokens.
 * @export
 * @param {Item[]} items - The items containing access tokens.
 * @param {string} timestamp - The timestamp for the update.
 * @param {AccountDB[]} accountsDB - The existing accounts in the database.
 * @param {HoldingDB[]} holdingsDB - The existing holdings in the database.
 * @param {string} user_id - The user ID.
 * @returns {Promise<any>} The investments for each item.
 */
export const getInvestmentsPlaid = async (
  items: Item[],
  timestamp: string,
  accountsDB: AccountDB[],
  holdingsDB: HoldingDB[],
  user_id: string
) => {

  /**
   *  Get all of the access tokens from the items
   */
  const accessTokens = getAllAccessTokens(items);

  /**
   *  Go through each item and fetch the investments
   */
  const investmentsForEachItem = await getAllHoldingsWithAccessTokens(
    accessTokens
  );

  /**
   *  Store Holdings and Securities in the database
   */
  investmentsForEachItem.forEach(async (item) => {
    await updateAccounts([item.accounts], accountsDB);
    await updateHoldingsAndSecurities({
      holdingsPlaid: item.holdings,
      securitiesPlaid: item.securities,
      timestamp,
      holdingsDB,
      user_id,
    });
  });

  return investmentsForEachItem;
};

/**
 * Represents the properties for getting investments with items from Plaid.
 * @export
 * @interface GetInvestmentsWithItemsPlaid
 */
interface GetInvestmentsWithItemsPlaid {
  /**
   * The items containing access tokens.
   * @type {Item[]}
   * @memberof GetInvestmentsWithItemsPlaid
   */
  items: Item[];
  /**
   * The timestamp for the update.
   * @type {string}
   * @memberof GetInvestmentsWithItemsPlaid
   */
  timestamp: string;
  /**
   * The user ID.
   * @type {string}
   * @memberof GetInvestmentsWithItemsPlaid
   */
  user_id: string;
  /**
   * The existing holdings in the database.
   * @type {Holding[]}
   * @memberof GetInvestmentsWithItemsPlaid
   */
  holdings: Holding[];
}

/**
 * Fetches investments with items from Plaid.
 * @export
 * @param {GetInvestmentsWithItemsPlaid} props - The properties for getting investments.
 * @returns {Promise<any>} The investments for each item.
 */
export const getInvestmentsWithItemsPlaid = async ({
  items,
  timestamp,
  user_id,
  holdings: holdingsDB,
}: GetInvestmentsWithItemsPlaid) => {
  // Extract access tokens from the provided items
  const accessTokens = getAllAccessTokens(items);

  // Fetch investment data for each access token
  const investmentsForEachItem = await getAllHoldingsWithAccessTokens(
    accessTokens
  );

  // Update the database with fetched holdings and related data
  investmentsForEachItem.forEach(async (item) => {
    await updateHoldings({
      holdings: item.holdings,
      timestamp,
      user_id,
      holdingsDB,
    });
  });

  return investmentsForEachItem;
};
