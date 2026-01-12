import Stripe from "stripe";

// Utils
import { logError } from "@/utils/api-helpers/errors/logError";

// Helpers
import {
  extractInvoiceFromStripeEvent,
} from "@/webhooks/stripe/helpers/invoice";

import { generateSubscriptionDataFromInvoice } from "@/webhooks/stripe/helpers/subscriptions";
import { updateSubscription } from "@/utils/prisma/stripe/subscriptions";

/**
 * This event handler endpoint processes invoice.paid event.
 */
/**
 * Handles the "payment_failed" event from Stripe.
 * 
 * This function processes the event to retrieve the associated invoice,
 * generates subscription data from the invoice, and updates the user's
 * subscription information in the system. If any step fails, it logs an error.
 * 
 * @param event - The Stripe event object representing the "payment_failed" event.
 * 
 * @throws Will log an error if there is an issue processing the event, 
 *         generating subscription data, or updating the subscription.
 */
const handlePaymentFailed = async (event: Stripe.Event) => {
  try {
    const invoice = extractInvoiceFromStripeEvent(event);
    const res = await generateSubscriptionDataFromInvoice(invoice);
    if (!res) return logError("Failed to generate subscription data");
    const { user_id, subscriptionData } = res;
    const subscription = await updateSubscription(user_id, subscriptionData);
    console.log(
      `Subscription ${subscription[0].subscriptionId} updated for user ${user_id} – status: ${subscription[0].status}`
    );
  } catch (error) {
    console.error("Error in handleInvoicePaidEvent:", error);
  }
};

export default handlePaymentFailed;
