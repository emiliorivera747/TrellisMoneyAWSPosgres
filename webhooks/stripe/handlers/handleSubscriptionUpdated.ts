import Stripe from "stripe";

// Utils
import { logError } from "@/utils/api-helpers/errors/logError";

/**
 * This event handler endpoint processes invoice.paid event.
 */
const handleSubscriptionUpdated = async (event: Stripe.Event) => {
  try {
  } catch (error) {
    console.error("Error in handleInvoicePaidEvent:", error);
  }
};

export default handleSubscriptionUpdated;
