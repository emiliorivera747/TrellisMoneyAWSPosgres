import Stripe from "stripe";
import { updateSubscription } from "@/utils/prisma/stripe/subscriptions";

// Helpers
import { extractInvoiceFromStripeEvent } from "@/webhooks/stripe/helpers/invoice";
import { logError } from "@/utils/api-helpers/errors/logError";
import { generateSubscriptionDataFromInvoice } from "@/webhooks/stripe/helpers/subscriptions";

/**
 * Handles the Stripe `invoice.paid` event.
 * Extracts invoice data, updates subscription, and logs errors if any step fails.
 * 
 * @param event - Stripe event object with `invoice.paid` data.
 */
const handleInvoicePaidEvent = async (event: Stripe.Event) => {
  try {
    
    const invoice = extractInvoiceFromStripeEvent(event);

    const res = await generateSubscriptionDataFromInvoice(invoice);
    if (!res) return logError("Failed to generate Subscriptin data");

    const { user_id, subscriptionData } = res;
    await updateSubscription(user_id, subscriptionData);
  } catch (error) {
    console.error("Error in handleInvoicePaidEvent:", error);
  }
};

export default handleInvoicePaidEvent;
