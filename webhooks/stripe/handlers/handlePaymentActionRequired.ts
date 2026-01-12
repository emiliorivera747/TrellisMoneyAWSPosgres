import Stripe from "stripe";

// Utils
import { logError } from "@/utils/api-helpers/errors/logError";
import { extractInvoiceFromStripeEvent } from "@/webhooks/stripe/helpers/invoice";
import { generateSubscriptionDataFromInvoice } from "@/webhooks/stripe/helpers/subscriptions";
import { updateSubscription } from "@/utils/drizzle/stripe/subscriptions";

/**
 * This event handler endpoint processes invoice.paid event.
 */
/**
 * Handles the "payment_action_required" event from Stripe.
 * This function processes the event, extracts the invoice, generates subscription data,
 * and updates the user's subscription accordingly.
 *
 * @param event - The Stripe event object containing details about the "payment_action_required" event.
 * 
 * @throws Will log an error if there is an issue processing the event, generating subscription data,
 *         or updating the subscription.
 */
const handlePaymentActionRequired = async (event: Stripe.Event) => {
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
    console.error("Error in handlePaymentActionRequired:", error);
  }
};

export default handlePaymentActionRequired;
