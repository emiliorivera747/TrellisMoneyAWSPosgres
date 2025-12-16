import Stripe from "stripe";
import { stripe } from "@/lib/stripe";

/**
 * Retrieves a fully expanded Subscription (for subscription.* events)
 */
export const getSubscriptionByEvent = async (
  event: Stripe.Event
): Promise<Stripe.Subscription> => {
  const subscription = event.data.object as Stripe.Subscription;

  if (!subscription.id)
    throw new Error("Invalid subscription event: missing ID");

  return await stripe.subscriptions.retrieve(subscription.id, {
    expand: ["items.data.price", "items.data.price.product", "customer"],
  });
};
