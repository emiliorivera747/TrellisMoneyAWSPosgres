import Stripe from "stripe";

// Utils
import { logError } from "@/utils/api-helpers/errors/logError";
import { getInvoiceFromEvent } from "@/webhooks/stripe/helpers/invoice";
import { generateSubscriptionDataFromInvoice } from "@/webhooks/stripe/helpers/subscriptions";
import { updateSubscription } from "@/utils/prisma/stripe/subscriptions";

/**
 * This event handler endpoint processes invoice.paid event.
 */
const handlePaymentActionRequired = async (event: Stripe.Event) => {
  try {
    const invoice = getInvoiceFromEvent(event);
    const res = await generateSubscriptionDataFromInvoice(invoice);
    if (!res) return logError("Failed to generate subscription data");
    const { user_id, subscriptionData } = res;
    await updateSubscription(user_id, subscriptionData);
  } catch (error) {
    console.error("Error in handlePaymentActionRequired:", error);
  }
};

export default handlePaymentActionRequired;
