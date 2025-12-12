import Stripe from "stripe";

// Enums
export type SubscriptionStatus =
  | "incomplete"
  | "incomplete_expired"
  | "trialing"
  | "active"
  | "past_due"
  | "canceled"
  | "unpaid"
  | "paused";

export type Interval = "day" | "week" | "month" | "year";

export type UsageType = "metered" | "licensed";

// Types
export interface Subscription {
  subscription_id: string;

  user_id: string;

  /**
   * ID of the customer who owns the subscription.
   */
  customer_id: string;

  /**
   * ID of the price associated with subscription
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
   */
  status: Stripe.Subscription.Status;

  /**
   * Date when the subscription was first created. The date might differ from the `created` date due to backdating.
   */
  start_date?: number;

  /**
   * If the subscription has a trial, the beginning of that trial.
   */
  trial_start?: number | null;

  /**
   * If the subscription has a trial, the end of that trial.
   */
  trial_end?: number | null;

  /**
   * If the subscription has ended, the date the subscription ended.
   */
  ended_at?: number | null;

  /**
   * A date in the future at which the subscription will automatically get canceled
   */
  cancel_at?: number | null;

  /**
   * Time at which the object was created. Measured in seconds since the Unix epoch.
   */
  created?: number;

  /**
   * Whether this subscription will (if `status=active`) or did (if `status=canceled`) cancel at the end of the current billing period.
   */
  cancel_at_period_end?: boolean;

  /**
   * If the subscription has been canceled, the date of that cancellation. If the subscription was canceled with `cancel_at_period_end`, `canceled_at` will reflect the time of the most recent update request, not the end of the subscription period when the subscription is automatically moved to a canceled state.
   */
  canceled_at: number | null;

  updated_at?: number;

  price?: Price;
}

export interface Price {
  price_id: string;

  product_id: string;

  /**
   * Three-letter [ISO currency code](https://www.iso.org/iso-4217-currency-codes.html), in lowercase. Must be a [supported currency](https://stripe.com/docs/currencies).
   */
  currency?: string;

  /**
   * The unit amount in cents (or local equivalent) to be charged, represented as a whole integer if possible. Only set if `billing_scheme=per_unit`.
   */
  unit_amount?: number | null;

  /**
   * The unit amount in cents (or local equivalent) to be charged, represented as a decimal string with at most 12 decimal places. Only set if `billing_scheme=per_unit`.
   */
  unit_amount_decimal?: string | null;

  /**
   * The frequency at which a subscription is billed. One of `day`, `week`, `month` or `year`.
   */
  recurring_interval: Interval;

  /**
   * The number of intervals (specified in the `interval` attribute) between subscription billings. For example, `interval=month` and `interval_count=3` bills every 3 months.
   */
  recurring_interval_count?: number;

  /**
   * Configures how the quantity per period should be determined. Can be either `metered` or `licensed`. `licensed` automatically bills the `quantity` set when adding it to a subscription. `metered` aggregates the total usage based on usage records. Defaults to `licensed`.
   */
  recurring_usage_type?: UsageType;

  /**
   * Default number of trial days when subscribing a customer to this price using [`trial_from_plan=true`](https://stripe.com/docs/api#create_subscription-trial_from_plan).
   */
  recurring_trial_period_days?: number | null;

  /**
   * Whether the price can be used for new purchases.
   */
  active?: boolean;

  /**
   * Time at which the object was created. Measured in seconds since the Unix epoch.
   */
  created?: number;

  updated_at?: number;

}

export interface Product {
  product_id: string;
  name: string;
  description?: string;
  active: boolean;

  created_at: number;
  updated_at: number;

  prices: Price[];
}
