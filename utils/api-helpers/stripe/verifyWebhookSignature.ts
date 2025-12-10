import { stripe } from "@/lib/stripe";
import Stripe from "stripe";
const WEBHOOK_SECRET = process.env.STRIPE_WEBHOOK_SECRET as string;

/**
 * Verifies the signature of a Stripe webhook event to ensure its authenticity.
 *
 * @param body - The raw request body received from the Stripe webhook.
 * @param signature - The Stripe signature header (`Stripe-Signature`) sent with the webhook request.
 * @returns The verified Stripe event object.
 * @throws {Error} Throws an error if the signature verification fails.
 *
 * @remarks
 * This function uses the `stripe.webhooks.constructEvent` method to validate the webhook signature
 * against the provided `WEBHOOK_SECRET`. If the signature is invalid, an error is thrown.
 *
 * @example
 * ```typescript
 * try {
 *   const event = verifyWebhookSignature(requestBody, stripeSignature);
 *   // Process the event
 * } catch (error) {
 *   console.error('Webhook signature verification failed:', error.message);
 * }
 * ```
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
