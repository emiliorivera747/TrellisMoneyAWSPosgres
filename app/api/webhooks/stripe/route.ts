import {
  verifyWebhookSignature,
  handleCheckoutSessionCompleted,
  handleSubscriptionDeleted,
} from "@/utils/api-helpers/stripe/webhookHandler";

import { NextRequest } from "next/server";

/**
 *
 * Stripe webhook handler
 *
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
        console.log("checkout.session.completed");
        await handleCheckoutSessionCompleted(event);
        break;
      case "checkout.session.expired":
        console.log("checkout.session.expired");
        break;
      case "customer.subscription.deleted":
        await handleSubscriptionDeleted(event);
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
