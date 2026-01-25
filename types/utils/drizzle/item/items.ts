import { ItemPublicTokenExchangeResponse } from "plaid";

/**
 * Properties for adding a new Plaid item.
 * @export
 * @typedef {Object} AddItemProps
 */
export type AddItemProps = {
  /**
   * The user ID who owns this item.
   * @type {string}
   * @memberof AddItemProps
   */
  userId: string;

  /**
   * The Plaid item data from public token exchange.
   * @type {ItemPublicTokenExchangeResponse}
   * @memberof AddItemProps
   */
  plaidItem: ItemPublicTokenExchangeResponse;
};

