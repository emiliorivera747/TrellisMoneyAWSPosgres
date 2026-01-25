/**
 * Properties for the payment link component.
 * @export
 * @typedef {Object} PaymentLinkProps
 */
export type PaymentLinkProps = {
  /**
   * The URL to navigate to when clicked.
   * @type {string}
   * @memberof PaymentLinkProps
   */
  href: string;

  /**
   * Optional payment link URL.
   * @type {string}
   * @memberof PaymentLinkProps
   */
  paymentLink?: string;

  /**
   * Text to display for the payment link.
   * @type {string}
   * @memberof PaymentLinkProps
   */
  text: string;

  /**
   * Reference to the anchor element.
   * @type {React.Ref<HTMLAnchorElement>}
   * @memberof PaymentLinkProps
   */
  ref?: React.Ref<HTMLAnchorElement>;
};
