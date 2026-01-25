import { PlaidLinkOnSuccessMetadata } from "react-plaid-link";

/**
 * Parameters for adding new accounts from Plaid.
 * @export
 * @interface AddAccountsParams
 */
export interface AddAccountsParams {
  /**
   * The item ID from Plaid.
   * @type {string}
   * @memberof AddAccountsParams
   */
  itemId: string;

  /**
   * Account metadata from Plaid Link success callback.
   * @type {PlaidLinkOnSuccessMetadata["accounts"]}
   * @memberof AddAccountsParams
   */
  plaidAccountsMetadata: PlaidLinkOnSuccessMetadata["accounts"];

  /**
   * The household member ID who owns these accounts.
   * @type {string}
   * @memberof AddAccountsParams
   */
  householdMemberId: string;
}
