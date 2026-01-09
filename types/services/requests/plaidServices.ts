import { PlaidLinkOnSuccessMetadata } from "react-plaid-link";

/**
 * Represents the properties for exchanging a Plaid token.
 * @export
 * @interface ExchangeTokenProps
 */
export interface ExchangeTokenProps {
  /**
   * The public token from Plaid Link.
   * @type {string}
   * @memberof ExchangeTokenProps
   */
  public_token: string;
  /**
   * The metadata from Plaid Link onSuccess callback.
   * @type {PlaidLinkOnSuccessMetadata}
   * @memberof ExchangeTokenProps
   */
  metadata: PlaidLinkOnSuccessMetadata;
  /**
   * The member ID.
   * @type {string}
   * @memberof ExchangeTokenProps
   */
  member_id: string;
}
