import { verifyWebhookSignature } from "@/utils/api-helpers/stripe/verifyWebhookSignature";
import { NextRequest } from "next/server";

// Handlers
import handleInvoicePaidEvent from "@/webhooks/stripe/handlers/handleInvoicePaidEvent";
import handleSubscriptionDeleted from "@/webhooks/stripe/handlers/handleSubscriptionDeleted";
import handleCheckoutSessionCompleted from "@/webhooks/stripe/handlers/handleCheckoutSessionCompleted";
import handlePaymentActionRequired from "@/webhooks/stripe/handlers/handlePaymentActionRequired";
import handlePaymentFailed from "@/webhooks/stripe/handlers/handlePaymentFailed";
import handleSubscriptionUpdated from "@/webhooks/stripe/handlers/handleSubscriptionUpdated";
import { getServerErrorMessage } from "@/utils/api-helpers/errors/getServerErrorMessage";

/**
 * Processes Stripe webhook events by verifying the signature, parsing the event,
 * and handling specific event types like `checkout.session.completed` and
 * `customer.subscription.deleted`. Logs unhandled events for debugging.
 *
 * @param req - Incoming `NextRequest` with the webhook payload and headers.
 * @returns `200 OK` for success, `400 Bad Request` for errors.
 */
export async function POST(req: NextRequest) {
  try {
    const body = await req.text();
    const signature = req.headers.get("Stripe-Signature");

    if (!signature)
      return new Response("Missing Stripe-Signature header", { status: 400 });

    const event = verifyWebhookSignature(body, signature);

    console.log(`Received event: ${event.type}`);

    switch (event.type) {
      case "invoice.paid":
        await handleInvoicePaidEvent(event);
        break;
      case "invoice.payment_failed":
        await handlePaymentFailed(event);
        break;
      case "customer.subscription.deleted":
        await handleSubscriptionDeleted(event);
        break;
      case "checkout.session.completed":
        await handleCheckoutSessionCompleted(event);
        break;
      // case "customer.subscription.created":
      //   break;
      case "customer.subscription.updated":
        await handleSubscriptionUpdated(event);
        break;
      case "invoice.payment_action_required":
        await handlePaymentActionRequired(event);
        break;
      // case "customer.subscription.resumed":
      //   break;
      // case "customer.subscription.trial_will_end":
      //   break;
      // case "invoice.upcoming":
      //   break;
      // case "payment_intent.succeeded":
      //   break;
      // case "product.created":
      //   break;
      // case "product.updated":
      //   break;
      // case "price.created":
      //   break;
      // case "price.updated":
      //   break;
      default:
      // console.log(`Unhandled event type: ${event.type}`);
    }
    console.log("Webhook processed successfully");
    return new Response("Webhook processed successfully", { status: 200 });
  } catch (error) {
    return new Response(`Webhook Error: ${getServerErrorMessage(error)}`, {
      status: 400,
    });
  }
}
