import Stripe from "stripe";

// Utils
import { logError } from "@/utils/api-helpers/errors/logError";

// Helpers
import {
  getInvoiceFromEvent,
  getSubscriptionFromInvoice,
} from "@/webhooks/stripe/helpers/invoice";

import { generateSubscriptionDataFromInvoice } from "@/webhooks/stripe/helpers/subscriptions";
import { getCustomerIdFromSub } from "@/webhooks/stripe/helpers/customers";
import { getUserByCustomerId } from "@/utils/prisma/user/user";
import { updateSubscription } from "@/utils/prisma/stripe/subscriptions";

/**
 * This event handler endpoint processes invoice.paid event.
 */
const handlePaymentFailed = async (event: Stripe.Event) => {
  try {
    const invoice = getInvoiceFromEvent(event);

    const result = await generateSubscriptionDataFromInvoice(invoice);
    if (!result)
      return logError("Failed to generate subscription data from invoice");
    const { user_id, subscriptionData } = result;

    await updateSubscription(user_id, subscriptionData);

  } catch (error) {
    console.error("Error in handleInvoicePaidEvent:", error);
  }
};

export default handlePaymentFailed;
