export interface StripeProduct {
  active: boolean;
  attributes: string[];
  created: number;
  default_price: string;
  description: string | null;
  id: string;
  images: string[];
  livemode: boolean;
  marketing_features: MarketingFeature[];
  metadata: Record<string, string>;
  name: string;
  object: string;
  package_dimensions: null | any;
  shippable: null | boolean;
  statement_descriptor: string | null;
  tax_code: string | null;
  type: "service" | "good";
  unit_label: string | null;
  updated: number;
  url: string | null;
}

export interface MarketingFeature {
  name: string;
}

export interface StripePrice {
  id: string;
  object: string;
  active: boolean;
  billing_scheme: "per_unit" | "tiered";
  created: number;
  currency: string;
  custom_unit_amount: null | any; // Adjust type if needed
  livemode: boolean;
  lookup_key: string | null;
  metadata: Record<string, string>;
  nickname: string | null;
  product: StripeProduct; // Updated to allow either a string or a StripeProduct object
  recurring: {
    interval: RecurringInterval;
    interval_count: number;
    trial_period_days: number | null;
    usage_type: "licensed" | "metered";
  } | null;
  tax_behavior: "unspecified" | "inclusive" | "exclusive";
  tiers_mode: "graduated" | "volume" | null;
  transform_quantity: null | any; // Adjust type if needed
  type: "one_time" | "recurring";
  unit_amount: number | null;
  unit_amount_decimal: string | null;
}

export type RecurringInterval = "day" | "week" | "month" | "year";
export type RecurringIntervalAbbreviation = "d" | "wk" | "mo" | "yr";
