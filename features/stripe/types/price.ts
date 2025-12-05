export interface StripePrice {
    id: string;
    object: string;
    active: boolean;
    billing_scheme: 'per_unit' | 'tiered';
    created: number;
    currency: string;
    custom_unit_amount: null | any; // Adjust type if needed
    livemode: boolean;
    lookup_key: string | null;
    metadata: Record<string, string>;
    nickname: string | null;
    product: string;
    recurring: {
        interval: 'day' | 'week' | 'month' | 'year';
        interval_count: number;
        trial_period_days: number | null;
        usage_type: 'licensed' | 'metered';
    } | null;
    tax_behavior: 'unspecified' | 'inclusive' | 'exclusive';
    tiers_mode: 'graduated' | 'volume' | null;
    transform_quantity: null | any; // Adjust type if needed
    type: 'one_time' | 'recurring';
    unit_amount: number | null;
    unit_amount_decimal: string | null;
}