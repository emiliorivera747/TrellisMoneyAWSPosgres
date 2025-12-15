import { stripe } from "@/lib/stripe";
import Stripe from "stripe";

import { Subscription } from "@/types/stripe";

const WEBHOOK_SECRET = process.env.STRIPE_WEBHOOK_SECRET as string;

/**
 *  Verifies the Stripe webhook signature.
 *
 */
export const verifyWebhookSignature = (
  body: string,
  signature: string
): Stripe.Event => {
  try {
    return stripe.webhooks.constructEvent(body, signature, WEBHOOK_SECRET);
  } catch (err) {
    throw new Error(`Signature verification failed: ${(err as Error).message}`);
  }
};

/**
 * Retrieves the subscription item from a list of Stripe line items.
 *
 * @param lineItems - An array of Stripe line items.
 * @returns The subscription item if found, otherwise undefined.
 */
export const getSubscriptionItemFromLineItems = (
  lineItems: Stripe.LineItem[]
) => {
  // Find the line item that represents a subscription
  const subscriptionItem = lineItems.find((item) => {
    const priceId = item.price?.id; // The price ID of the line item
    const isSubscription = !!item.price?.recurring; // Check if the price is recurring (indicating a subscription)
    return priceId && isSubscription; // Return true if both conditions are met
  });

  return subscriptionItem; // Return the subscription item or undefined
};

/**
 * Generates a subscription object based on the provided Stripe subscription data
 * and additional parameters.
 *
 * @param {Object} params - The parameters for generating the subscription.
 * @param {Stripe.Subscription} params.subscription - The Stripe subscription object.
 * @param {string} params.customer_id - The ID of the customer associated with the subscription.
 * @param {string} params.price_id - The ID of the price associated with the subscription.
 * @param {string} params.user_id - The ID of the user associated with the subscription.
 *
 * @returns {Subscription} The generated subscription object containing normalized data.
 */
export const generateSubscription = ({
  subscription,
  customer_id,
  price_id,
  user_id,
}: {
  subscription: Stripe.Subscription;
  customer_id: string;
  price_id: string;
  user_id: string;
}) => {
  const subscriptionData: Subscription = {
    subscription_id: subscription.id,
    user_id,
    customer_id,
    price_id,
    status: subscription.status as Subscription["status"],
    start_date: subscription.start_date ?? 0,
    trial_start: subscription.trial_start ?? 0,
    trial_end: subscription.trial_end ?? 0,
    ended_at: subscription.ended_at ?? 0,
    cancel_at: subscription.cancel_at ?? 0,
    cancel_at_period_end: subscription.cancel_at_period_end ?? false,
    canceled_at: subscription.canceled_at ?? 0,
    created_at: subscription.created ?? 0,
    updated_at: Math.floor(Date.now() / 1000),
  };

  return subscriptionData;
};

export const getSubscriptionItemFromSubscription = (
  subscription: Stripe.Subscription
) => {
  const subscriptionItem = subscription.items.data.find(
    (item: Stripe.SubscriptionItem) => item.price.recurring !== null
  );
  return subscriptionItem;
};
