import Stripe from "stripe";
import { stripe } from "@/lib/stripe";

/**
 * Retrieves a Stripe Checkout Session with expanded line items.
 *
 * @param event - The Stripe event containing the Checkout Session ID.
 * @returns A promise that resolves to the retrieved Checkout Session object.
 *
 * @remarks
 * This function uses the Stripe API to fetch the details of a Checkout Session
 * based on the ID provided in the event object. The `line_items` property is expanded
 * to include detailed information about the items in the session.
 *
 * @throws Will throw an error if the session retrieval fails or the event data is invalid.
 */
export const getCheckoutSession = async (event: Stripe.Event) => {
  const session = await stripe.checkout.sessions.retrieve(
    (event.data.object as Stripe.Checkout.Session).id,
    { expand: ["line_items", "subscription"] }
  );

  return session;
};

/**
 * Retrieves a subscription session from Stripe based on the provided event.
 *
 * @param event - The Stripe event containing the subscription data.
 *                The event's `data.object` is expected to be of type `Stripe.Subscription`.
 * @returns A promise that resolves to the retrieved Stripe subscription object.
 *
 * @throws Will throw an error if the subscription retrieval fails.
 */
export const getSubscriptionSession = async (event: Stripe.Event) => {
  const subscription = await stripe.subscriptions.retrieve(
    (event.data.object as Stripe.Subscription).id
  );
  return subscription;
};
