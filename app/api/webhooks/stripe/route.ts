import {
  verifyWebhookSignature,
  handleCheckoutSessionCompleted,
  handleSubscriptionDeleted,
} from "@/utils/api-helpers/stripe/webhookHandler";

import { NextRequest } from "next/server"; // Assuming Next.js 13+ App Router

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

    // Verify webhook
    const event = verifyWebhookSignature(body, signature);

    // Handle events
    switch (event.type) {
      case "checkout.session.completed":
        await handleCheckoutSessionCompleted(event);
        break;
      case "customer.subscription.deleted":
        await handleSubscriptionDeleted(event);
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
