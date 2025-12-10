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
    { expand: ["line_items"] }
  );

  return session;
};
