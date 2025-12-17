import Stripe from "stripe";
import { stripe } from "@/lib/stripe";

interface CreateSessionProps {
  customer_email: string;
  price_id: string;
  success_url?: string;
  cancel_url?: string;
}

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

/**
 * Creates a Stripe Checkout Session for a subscription.
 *
 * @param userEmail - The email address of the customer to associate with the session.
 * @param priceId - The ID of the price object for the subscription.
 * @returns A promise that resolves to the URL of the created Checkout Session.
 *
 * The session is configured to:
 * - Use card as the payment method.
 * - Associate the session with the provided customer email.
 * - Operate in subscription mode.
 * - Include a single line item with the specified price ID and a quantity of 1.
 * - Redirect to a success URL with the session ID appended as a query parameter upon successful payment.
 * - Redirect to a cancel URL if the payment is canceled.
 *
 * Environment variables:
 * - `NEXT_PUBLIC_DOMAIN` is used to construct the success and cancel URLs.
 */
export async function createCheckoutSession({
  customer_email,
  price_id,
  success_url,
  cancel_url,
}: CreateSessionProps) {
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    customer_email,
    mode: "subscription",
    line_items: [{ price: price_id, quantity: 1 }],
    success_url: success_url
      ? success_url
      : `${process.env.NEXT_PUBLIC_DOMAIN}/dashboard`,
    cancel_url: cancel_url
      ? cancel_url
      : `${process.env.NEXT_PUBLIC_DOMAIN}/billing`,
  });
  return session.url;
}
