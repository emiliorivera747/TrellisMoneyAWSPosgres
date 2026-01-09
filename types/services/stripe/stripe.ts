import Stripe from "stripe";

/**
 * Represents the status of a subscription.
 * @export
 * @typedef {"incomplete" | "incomplete_expired" | "trialing" | "active" | "past_due" | "canceled" | "unpaid" | "paused"} SubscriptionStatus
 */
export type SubscriptionStatus =
  | "incomplete"
  | "incomplete_expired"
  | "trialing"
  | "active"
  | "past_due"
  | "canceled"
  | "unpaid"
  | "paused";

/**
 * Represents the billing interval for a subscription.
 * @export
 * @typedef {"day" | "week" | "month" | "year"} Interval
 */
export type Interval = "day" | "week" | "month" | "year";

/**
 * Represents the usage type for a subscription.
 * @export
 * @typedef {"metered" | "licensed"} UsageType
 */
export type UsageType = "metered" | "licensed";

/**
 * Represents a subscription.
 * @export
 * @interface Subscription
 */
export interface Subscription {
  /**
   * The subscription ID.
   * @type {string}
   * @memberof Subscription
   */
  subscription_id: string;

  /**
   * The user ID associated with the subscription.
   * @type {string}
   * @memberof Subscription
   */
  user_id: string;

  /**
   * ID of the customer who owns the subscription.
   * @type {string}
   * @memberof Subscription
   */
  customer_id: string;

  /**
   * ID of the price associated with subscription.
   * @type {string}
   * @memberof Subscription
   */
  price_id?: string;

  /**
   * Possible values are `incomplete`, `incomplete_expired`, `trialing`, `active`, `past_due`, `canceled`, `unpaid`, or `paused`.
   *
   * For `collection_method=charge_automatically` a subscription moves into `incomplete` if the initial payment attempt fails. A subscription in this status can only have metadata and default_source updated. Once the first invoice is paid, the subscription moves into an `active` status. If the first invoice is not paid within 23 hours, the subscription transitions to `incomplete_expired`. This is a terminal status, the open invoice will be voided and no further invoices will be generated.
   *
   * A subscription that is currently in a trial period is `trialing` and moves to `active` when the trial period is over.
   *
   * A subscription can only enter a `paused` status [when a trial ends without a payment method](https://stripe.com/docs/billing/subscriptions/trials#create-free-trials-without-payment). A `paused` subscription doesn't generate invoices and can be resumed after your customer adds their payment method. The `paused` status is different from [pausing collection](https://stripe.com/docs/billing/subscriptions/pause-payment), which still generates invoices and leaves the subscription's status unchanged.
   *
   * If subscription `collection_method=charge_automatically`, it becomes `past_due` when payment is required but cannot be paid (due to failed payment or awaiting additional user actions). Once Stripe has exhausted all payment retry attempts, the subscription will become `canceled` or `unpaid` (depending on your subscriptions settings).
   *
   * If subscription `collection_method=send_invoice` it becomes `past_due` when its invoice is not paid by the due date, and `canceled` or `unpaid` if it is still not paid by an additional deadline after that. Note that when a subscription has a status of `unpaid`, no subsequent invoices will be attempted (invoices will be created, but then immediately automatically closed). After receiving updated payment information from a customer, you may choose to reopen and pay their closed invoices.
   * @type {Stripe.Subscription.Status}
   * @memberof Subscription
   */
  status: Stripe.Subscription.Status;

  /**
   * Date when the subscription was first created. The date might differ from the `created` date due to backdating.
   * @type {number}
   * @memberof Subscription
   */
  start_date?: number;

  /**
   * If the subscription has a trial, the beginning of that trial.
   * @type {number | null}
   * @memberof Subscription
   */
  trial_start?: number | null;

  /**
   * If the subscription has a trial, the end of that trial.
   * @type {number | null}
   * @memberof Subscription
   */
  trial_end?: number | null;

  /**
   * If the subscription has ended, the date the subscription ended.
   * @type {number | null}
   * @memberof Subscription
   */
  ended_at?: number | null;

  /**
   * A date in the future at which the subscription will automatically get canceled.
   * @type {number | null}
   * @memberof Subscription
   */
  cancel_at?: number | null;

  /**
   * Time at which the object was created. Measured in seconds since the Unix epoch.
   * @type {number}
   * @memberof Subscription
   */
  created_at?: number;

  /**
   * Whether this subscription will (if `status=active`) or did (if `status=canceled`) cancel at the end of the current billing period.
   * @type {boolean}
   * @memberof Subscription
   */
  cancel_at_period_end?: boolean;

  /**
   * If the subscription has been canceled, the date of that cancellation. If the subscription was canceled with `cancel_at_period_end`, `canceled_at` will reflect the time of the most recent update request, not the end of the subscription period when the subscription is automatically moved to a canceled state.
   * @type {number | null}
   * @memberof Subscription
   */
  canceled_at: number | null;

  /**
   * The date the subscription was last updated.
   * @type {number}
   * @memberof Subscription
   */
  updated_at?: number;
}

/**
 * Represents a price.
 * @export
 * @interface Price
 */
export interface Price {
  /**
   * The price ID.
   * @type {string}
   * @memberof Price
   */
  price_id: string;

  /**
   * The product ID associated with the price.
   * @type {string}
   * @memberof Price
   */
  product_id: string;

  /**
   * Three-letter [ISO currency code](https://www.iso.org/iso-4217-currency-codes.html), in lowercase. Must be a [supported currency](https://stripe.com/docs/currencies).
   * @type {string}
   * @memberof Price
   */
  currency?: string;

  /**
   * The unit amount in cents (or local equivalent) to be charged, represented as a whole integer if possible. Only set if `billing_scheme=per_unit`.
   * @type {number | null}
   * @memberof Price
   */
  unit_amount?: number | null;

  /**
   * The unit amount in cents (or local equivalent) to be charged, represented as a decimal string with at most 12 decimal places. Only set if `billing_scheme=per_unit`.
   * @type {string | null}
   * @memberof Price
   */
  unit_amount_decimal?: string | null;

  /**
   * The frequency at which a subscription is billed. One of `day`, `week`, `month` or `year`.
   * @type {Interval}
   * @memberof Price
   */
  recurring_interval: Interval;

  /**
   * The number of intervals (specified in the `interval` attribute) between subscription billings. For example, `interval=month` and `interval_count=3` bills every 3 months.
   * @type {number}
   * @memberof Price
   */
  recurring_interval_count?: number;

  /**
   * Configures how the quantity per period should be determined. Can be either `metered` or `licensed`. `licensed` automatically bills the `quantity` set when adding it to a subscription. `metered` aggregates the total usage based on usage records. Defaults to `licensed`.
   * @type {UsageType}
   * @memberof Price
   */
  recurring_usage_type?: UsageType;

  /**
   * Default number of trial days when subscribing a customer to this price using [`trial_from_plan=true`](https://stripe.com/docs/api#create_subscription-trial_from_plan).
   * @type {number | null}
   * @memberof Price
   */
  recurring_trial_period_days?: number | null;

  /**
   * Whether the price can be used for new purchases.
   * @type {boolean}
   * @memberof Price
   */
  active?: boolean;

  /**
   * Time at which the object was created. Measured in seconds since the Unix epoch.
   * @type {number}
   * @memberof Price
   */
  created?: number;

  /**
   * The date the price was last updated.
   * @type {number}
   * @memberof Price
   */
  updated_at?: number;
}

/**
 * Represents a product.
 * @export
 * @interface Product
 */
export interface Product {
  /**
   * The product ID.
   * @type {string}
   * @memberof Product
   */
  product_id: string;
  /**
   * The product name.
   * @type {string}
   * @memberof Product
   */
  name: string;
  /**
   * The product description.
   * @type {string}
   * @memberof Product
   */
  description?: string;
  /**
   * Whether the product is active.
   * @type {boolean}
   * @memberof Product
   */
  active: boolean;

  /**
   * The date the product was created.
   * @type {number}
   * @memberof Product
   */
  created_at: number;
  /**
   * The date the product was last updated.
   * @type {number}
   * @memberof Product
   */
  updated_at: number;

  /**
   * The prices associated with the product.
   * @type {Price[]}
   * @memberof Product
   */
  prices: Price[];
}

/**
 * Represents a minimal subscription object.
 * @export
 * @typedef {Object} MinmalSubscription
 * @property {SubscriptionStatus} status - The subscription status.
 * @property {number | null} cancel_at - The date the subscription will be canceled.
 * @property {boolean} cancel_at_period_end - Whether the subscription will cancel at period end.
 */
export type MinmalSubscription = {
  /**
   * The subscription status.
   * @type {SubscriptionStatus}
   * @memberof MinmalSubscription
   */
  status: SubscriptionStatus;
  /**
   * The date the subscription will be canceled.
   * @type {number | null}
   * @memberof MinmalSubscription
   */
  cancelAt: number | null;
  /**
   * Whether the subscription will cancel at period end.
   * @type {boolean}
   * @memberof MinmalSubscription
   */
  cancelAtPeriodEnd: boolean;
};
