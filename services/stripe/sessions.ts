import Stripe from "stripe";
import { stripe } from "@/lib/stripe";

/**
 * Retrieves a fully expanded Checkout Session
 */
export const getStripeCheckoutSession = async (
  event: Stripe.Event
): Promise<Stripe.Checkout.Session> => {
  const session = event.data.object as Stripe.Checkout.Session;

  if (!session.id)
    throw new Error("Invalid checkout session event: missing ID");

  return await stripe.checkout.sessions.retrieve(session.id, {
    expand: ["subscription", "subscription.items.data.price"],
  });
};
