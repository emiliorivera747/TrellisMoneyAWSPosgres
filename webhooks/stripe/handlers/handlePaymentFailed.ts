import Stripe from "stripe";

// Utils
import { logError } from "@/utils/api-helpers/errors/logError";

// Helpers
import { getInvoiceFromEvent } from "@/webhooks/stripe/helpers/invoice";

/**
 * This event handler endpoint processes invoice.paid event.
 */
const handlePaymentFailed = async (event: Stripe.Event) => {
  try {
    const invoice = getInvoiceFromEvent(event);
  } catch (error) {
    console.error("Error in handleInvoicePaidEvent:", error);
  }
};

export default handlePaymentFailed;
