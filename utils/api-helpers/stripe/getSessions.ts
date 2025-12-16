import Stripe from "stripe";
import { stripe } from "@/lib/stripe";

/**
 * Retrieves a fully expanded Checkout Session
 */
export const getCheckoutSession = async (
  event: Stripe.Event
): Promise<Stripe.Checkout.Session> => {
  const session = event.data.object as Stripe.Checkout.Session;

  if (!session.id)
    throw new Error("Invalid checkout session event: missing ID");

  return await stripe.checkout.sessions.retrieve(session.id, {
    expand: ["subscription", "subscription.items.data.price"],
  });
};

/**
 * Retrieves a fully expanded Subscription (for subscription.* events)
 */
export const getSubscriptionSession = async (
  event: Stripe.Event
): Promise<Stripe.Subscription> => {
  const subscription = event.data.object as Stripe.Subscription;

  if (!subscription.id)
    throw new Error("Invalid subscription event: missing ID");

  return await stripe.subscriptions.retrieve(subscription.id, {
    expand: ["items.data.price", "items.data.price.product", "customer"],
  });
};

