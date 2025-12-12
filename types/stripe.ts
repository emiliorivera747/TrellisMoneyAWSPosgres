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
    customer_id: string;

    price_id?: string;

    status: SubscriptionStatus;

    start_date: Date;
    current_period_start: Date;
    current_period_end: Date;

    trial_start?: Date;
    trial_end?: Date;

    ended_at?: Date;
    canceled_at?: Date;
    cancel_at_period_end: boolean;

    created_at?: Date;
    updated_at?: Date;

    price?: Price;
}

export interface Price {
    price_id: string;

    product_id: string;

    currency: string;
    unit_amount: bigint;

    recurring_interval: Interval;
    recurring_interval_count?: number;
    recurring_usage_type: UsageType;

    active: boolean;

    created_at: Date;
    updated_at: Date;

    product: Product;
    subscriptions: Subscription[];
}

export interface Product {
    product_id: string;
    name: string;
    description?: string;
    active: boolean;

    created_at: Date;
    updated_at: Date;

    prices: Price[];
}
