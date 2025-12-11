import {
  handleCheckoutSessionCompleted,
  handleSubscriptionDeleted,
} from "@/utils/api-helpers/stripe/webhookHandler";
import { verifyWebhookSignature } from "@/utils/api-helpers/stripe/verifyWebhookSignature";

import { NextRequest } from "next/server";

/**
 * Handles incoming POST requests for Stripe webhooks.
 *
 * This function processes Stripe webhook events by verifying the signature,
 * parsing the event, and handling specific event types such as:
 * - `checkout.session.completed`: Handles successful checkout sessions.
 * - `customer.subscription.deleted`: Handles subscription deletions.
 *
 * If the event type is unhandled, it logs the event type for debugging purposes.
 *
 * @param req - The incoming `NextRequest` object containing the webhook payload and headers.
 * @returns A `Response` object indicating the result of the webhook processing:
 * - `200 OK` if the webhook is processed successfully.
 * - `400 Bad Request` if there is an error, such as a missing signature or invalid payload.
 *
 * @throws Will return a `400 Bad Request` response if an error occurs during processing.
 */
export async function POST(req: NextRequest) {
  try {
    const body = await req.text();
    const signature = req.headers.get("Stripe-Signature");

    if (!signature)
      return new Response("Missing Stripe-Signature header", { status: 400 });

    const event = verifyWebhookSignature(body, signature);

    switch (event.type) {
      case "checkout.session.completed":
        await handleCheckoutSessionCompleted(event);
        break;
      case "customer.subscription.created":
        break;
      case "customer.subscription.updated":
        break;
      case "customer.subscription.deleted":
        await handleSubscriptionDeleted(event);
        break;
      case "customer.subscription.resumed":
        break;
      case "customer.subscription.trial_will_end":
        break;
      case "invoice.paid":
        break;
      case "invoice.payment_failed":
        break;
      case "invoice.payment_action_required":
        break;
      case "invoice.upcoming":
        break;
      case "payment_intent.succeeded":
        break;
      default:
        console.log(`Unhandled event type: ${event.type}`);
    }
    return new Response("Webhook processed successfully", { status: 200 });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    return new Response(`Webhook Error: ${message}`, { status: 400 });
  }
}
