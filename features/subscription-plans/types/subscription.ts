/**
 * Properties for the payment link component.
 * @export
 * @typedef {Object} PaymentLinkProps
 */
export type PaymentLinkProps = {
  /**
   * The URL to navigate to when the link is clicked.
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
   * CSS class name for styling.
   * @type {string}
   * @memberof PaymentLinkProps
   */
  className?: string;

  /**
   * Label text for the link.
   * @type {string}
   * @memberof PaymentLinkProps
   */
  label: string;

  /**
   * Reference to the anchor element.
   * @type {React.Ref<HTMLAnchorElement>}
   * @memberof PaymentLinkProps
   */
  ref?: React.Ref<HTMLAnchorElement>;
};

/**
 * Properties for the subscription card component.
 * @export
 * @interface SubscriptionCardProps
 */
export interface SubscriptionCardProps {
  /**
   * Title of the subscription plan.
   * @type {string}
   * @memberof SubscriptionCardProps
   */
  title: string;

  /**
   * Price of the subscription.
   * @type {string}
   * @memberof SubscriptionCardProps
   */
  price: string;

  /**
   * URL for the subscription payment link.
   * @type {string}
   * @memberof SubscriptionCardProps
   */
  subscription_link_url: string;

  /**
   * List of features included in the subscription.
   * @type {string[]}
   * @memberof SubscriptionCardProps
   */
  features: string[];

  /**
   * Footer description text for the subscription card.
   * @type {string}
   * @memberof SubscriptionCardProps
   */
  footerDescription: string;
}
