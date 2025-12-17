import Stripe from "stripe";

// Utils
import { logError } from "@/utils/api-helpers/errors/logError";

// Helpers
import {
  getInvoiceFromEvent,
  getSubscriptionFromInvoice,
} from "@/webhooks/stripe/helpers/invoice";

import { generateSubscriptionData } from "@/webhooks/stripe/helpers/subscriptions";
import { getCustomerIdFromSub } from "../helpers/customers";
import { getUserByCustomerId } from "@/utils/prisma/user/user";

import { updateSubscription } from "@/utils/prisma/stripe/subscriptions";

/**
 * This event handler endpoint processes invoice.paid event.
 */
const handlePaymentFailed = async (event: Stripe.Event) => {
  try {
    const invoice = getInvoiceFromEvent(event);

    const subscription = await getSubscriptionFromInvoice(invoice);
    if (!subscription) return logError("Subscription object was not found");

    const customer_id = getCustomerIdFromSub(subscription);
    if (!customer_id) return logError("");

    const user = await getUserByCustomerId(customer_id);
    if (!user) return logError("User does not exist with customer id");

    const subscriptionData = generateSubscriptionData({
      subscription,
      customer_id,
      user_id: user.user_id,
    });

    await updateSubscription(user.user_id, subscriptionData);

    console.log(
      `Subscription ${subscription.id} updated for user ${user.user_id} – status: ${subscription.status}`
    );
  } catch (error) {
    console.error("Error in handleInvoicePaidEvent:", error);
  }
};

export default handlePaymentFailed;
