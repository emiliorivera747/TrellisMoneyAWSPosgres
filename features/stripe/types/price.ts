/**
 * Represents a Stripe product.
 * @export
 * @interface StripeProduct
 */
export interface StripeProduct {
  /**
   * Whether the product is currently available for purchase.
   * @type {boolean}
   * @memberof StripeProduct
   */
  active: boolean;

  /**
   * List of product attributes.
   * @type {string[]}
   * @memberof StripeProduct
   */
  attributes: string[];

  /**
   * Time at which the product was created (Unix timestamp).
   * @type {number}
   * @memberof StripeProduct
   */
  created: number;

  /**
   * The ID of the default price for this product.
   * @type {string}
   * @memberof StripeProduct
   */
  default_price: string;

  /**
   * The product's description.
   * @type {string | null}
   * @memberof StripeProduct
   */
  description: string | null;

  /**
   * Unique identifier for the product.
   * @type {string}
   * @memberof StripeProduct
   */
  id: string;

  /**
   * A list of image URLs for the product.
   * @type {string[]}
   * @memberof StripeProduct
   */
  images: string[];

  /**
   * Whether the product is in live mode.
   * @type {boolean}
   * @memberof StripeProduct
   */
  livemode: boolean;

  /**
   * A list of marketing features for the product.
   * @type {MarketingFeature[]}
   * @memberof StripeProduct
   */
  marketing_features: MarketingFeature[];

  /**
   * Set of key-value pairs for storing additional information.
   * @type {Record<string, string>}
   * @memberof StripeProduct
   */
  metadata: Record<string, string>;

  /**
   * The product's name.
   * @type {string}
   * @memberof StripeProduct
   */
  name: string;

  /**
   * String representing the object's type.
   * @type {string}
   * @memberof StripeProduct
   */
  object: string;

  /**
   * Package dimensions for shipping purposes.
   * @type {null | any}
   * @memberof StripeProduct
   */
  package_dimensions: null | any;

  /**
   * Whether the product can be shipped.
   * @type {null | boolean}
   * @memberof StripeProduct
   */
  shippable: null | boolean;

  /**
   * Statement descriptor for the product.
   * @type {string | null}
   * @memberof StripeProduct
   */
  statement_descriptor: string | null;

  /**
   * Tax code for the product.
   * @type {string | null}
   * @memberof StripeProduct
   */
  tax_code: string | null;

  /**
   * The type of the product.
   * @type {"service" | "good"}
   * @memberof StripeProduct
   */
  type: "service" | "good";

  /**
   * Unit label for the product.
   * @type {string | null}
   * @memberof StripeProduct
   */
  unit_label: string | null;

  /**
   * Time at which the product was last updated (Unix timestamp).
   * @type {number}
   * @memberof StripeProduct
   */
  updated: number;

  /**
   * URL of the product.
   * @type {string | null}
   * @memberof StripeProduct
   */
  url: string | null;
}

/**
 * Represents a marketing feature for a Stripe product.
 * @export
 * @interface MarketingFeature
 */
export interface MarketingFeature {
  /**
   * Name of the marketing feature.
   * @type {string}
   * @memberof MarketingFeature
   */
  name: string;
}

/**
 * Represents a Stripe price.
 * @export
 * @interface StripePrice
 */
export interface StripePrice {
  /**
   * Unique identifier for the price.
   * @type {string}
   * @memberof StripePrice
   */
  id: string;

  /**
   * String representing the object's type.
   * @type {string}
   * @memberof StripePrice
   */
  object: string;

  /**
   * Whether the price can be used for new purchases.
   * @type {boolean}
   * @memberof StripePrice
   */
  active: boolean;

  /**
   * Describes how to compute the price per period.
   * @type {"per_unit" | "tiered"}
   * @memberof StripePrice
   */
  billing_scheme: "per_unit" | "tiered";

  /**
   * Time at which the price was created (Unix timestamp).
   * @type {number}
   * @memberof StripePrice
   */
  created: number;

  /**
   * Three-letter ISO currency code.
   * @type {string}
   * @memberof StripePrice
   */
  currency: string;

  /**
   * Custom unit amount, if applicable.
   * @type {null | any}
   * @memberof StripePrice
   */
  custom_unit_amount: null | any;

  /**
   * Whether the price is in live mode.
   * @type {boolean}
   * @memberof StripePrice
   */
  livemode: boolean;

  /**
   * A lookup key used to retrieve prices dynamically.
   * @type {string | null}
   * @memberof StripePrice
   */
  lookup_key: string | null;

  /**
   * Set of key-value pairs for storing additional information.
   * @type {Record<string, string>}
   * @memberof StripePrice
   */
  metadata: Record<string, string>;

  /**
   * A brief description of the price.
   * @type {string | null}
   * @memberof StripePrice
   */
  nickname: string | null;

  /**
   * The product this price is associated with.
   * @type {StripeProduct}
   * @memberof StripePrice
   */
  product: StripeProduct;

  /**
   * The recurring components of a price.
   * @type {{interval: RecurringInterval; interval_count: number; trial_period_days: number | null; usage_type: "licensed" | "metered"} | null}
   * @memberof StripePrice
   */
  recurring: {
    interval: RecurringInterval;
    interval_count: number;
    trial_period_days: number | null;
    usage_type: "licensed" | "metered";
  } | null;

  /**
   * Specifies whether the price is considered inclusive or exclusive of taxes.
   * @type {"unspecified" | "inclusive" | "exclusive"}
   * @memberof StripePrice
   */
  tax_behavior: "unspecified" | "inclusive" | "exclusive";

  /**
   * Defines if the tiering price should be graduated or volume based.
   * @type {"graduated" | "volume" | null}
   * @memberof StripePrice
   */
  tiers_mode: "graduated" | "volume" | null;

  /**
   * Apply a transformation to the reported usage or set quantity before computing the amount billed.
   * @type {null | any}
   * @memberof StripePrice
   */
  transform_quantity: null | any;

  /**
   * Whether the price is for a one-time purchase or a recurring subscription.
   * @type {"one_time" | "recurring"}
   * @memberof StripePrice
   */
  type: "one_time" | "recurring";

  /**
   * The unit amount in cents to be charged.
   * @type {number | null}
   * @memberof StripePrice
   */
  unit_amount: number | null;

  /**
   * The unit amount in cents as a decimal string.
   * @type {string | null}
   * @memberof StripePrice
   */
  unit_amount_decimal: string | null;
}

/**
 * Represents the interval for recurring payments.
 * @export
 * @typedef {"day" | "week" | "month" | "year"} RecurringInterval
 */
export type RecurringInterval = "day" | "week" | "month" | "year";

/**
 * Represents abbreviated interval names for recurring payments.
 * @export
 * @typedef {"d" | "wk" | "mo" | "yr"} RecurringIntervalAbbreviation
 */
export type RecurringIntervalAbbreviation = "d" | "wk" | "mo" | "yr";
