import Stripe from "stripe";
import { updateSubscription } from "@/utils/prisma/stripe/subscriptions";

// Helpers
import { getInvoiceFromEvent } from "@/webhooks/stripe/helpers/invoice";
import { logError } from "@/utils/api-helpers/errors/logError";
import { generateSubscriptionDataFromInvoice } from "@/webhooks/stripe/helpers/subscriptions";

/**
 * This event handler endpoint processes invoice.paid event.
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
