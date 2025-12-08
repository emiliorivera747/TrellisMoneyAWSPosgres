import { stripe } from "@/lib/stripe";

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
async function createCheckoutSession(userEmail: string, priceId: string) {
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    customer_email: userEmail,
    mode: "subscription",
    line_items: [{ price: priceId, quantity: 1 }],
    success_url: `${process.env.NEXT_PUBLIC_DOMAIN}/dashboard?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${process.env.NEXT_PUBLIC_DOMAIN}/billing`,
  });
  return session.url;
}

export default createCheckoutSession;
