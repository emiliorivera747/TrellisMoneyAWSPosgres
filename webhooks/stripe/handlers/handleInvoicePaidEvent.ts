import Stripe from "stripe";
import { updateSubscription } from "@/utils/prisma/stripe/subscriptions";

// Helpers
import { getInvoiceFromEvent } from "@/webhooks/stripe/helpers/invoice";
import { logError } from "@/utils/api-helpers/errors/logError";
import { generateSubscriptionDataFromInvoice } from "@/webhooks/stripe/helpers/subscriptions";

/**
 * This event handler endpoint processes invoice.paid event.
 */
/**
 * Handles the Stripe `invoice.paid` event.
 * 
 * This function processes the event by extracting the invoice data,
 * generating subscription data from the invoice, and updating the user's
 * subscription information in the system. If any step fails, it logs an error.
 * 
 * @param event - The Stripe event object containing the `invoice.paid` event data.
 * 
 * @throws Will log an error if there is an issue processing the event or updating the subscription.
 */
const handleInvoicePaidEvent = async (event: Stripe.Event) => {
  try {
    
    const invoice = getInvoiceFromEvent(event);

    const res = await generateSubscriptionDataFromInvoice(invoice);
    if (!res) return logError("Failed to generate Subscriptin data");

    const { user_id, subscriptionData } = res;
    await updateSubscription(user_id, subscriptionData);
  } catch (error) {
    console.error("Error in handleInvoicePaidEvent:", error);
  }
};

export default handleInvoicePaidEvent;
