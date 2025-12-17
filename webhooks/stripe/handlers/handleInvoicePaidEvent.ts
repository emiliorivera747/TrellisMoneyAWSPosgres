import Stripe from "stripe";
import { getUserByCustomerId } from "@/utils/prisma/user/user";
import {
  generateSubscriptionData,
  getCustomerIdFromSub,
} from "@/utils/api-helpers/stripe/webhookHelpers";
import { updateSubscription } from "@/utils/prisma/stripe/subscriptions";
import { getSubscriptionFromInvoice } from "@/webhooks/stripe/helpers/invoice";
import { logError } from "@/utils/api-helpers/errors/logError";

/**
 * This event handler endpoint processes invoice.paid event.
 */
const handleInvoicePaidEvent = async (event: Stripe.Event) => {
  try {
    const invoice = event.data.object as Stripe.Invoice;

    // ----- Get the subscription -----
    const subscription = await getSubscriptionFromInvoice(invoice);
    if (!subscription) return logError("Subscription object was not found");

    // ----- Get the customer id -----
    const customerId = getCustomerIdFromSub(subscription);
    if (!customerId) return logError("Could not retrieve the customer id");

    // ----- Get the user -----
    const user = await getUserByCustomerId(customerId);
    if (!user) return logError("User does not exist with customer id");

    // ---- Get subscription data to update the subscription -----
    const subscriptionData = generateSubscriptionData({
      subscription,
      customer_id: customerId as string,
      user_id: user.user_id,
    });

    await updateSubscription(user.user_id, subscriptionData);
  } catch (error) {
    console.error("Error in handleInvoicePaidEvent:", error);
  }
};


export default handleInvoicePaidEvent;