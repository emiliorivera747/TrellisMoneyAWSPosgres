import Stripe from "stripe";

import { getUserByCustomerId } from "@/utils/prisma/user/user";

import {
  generateSubscriptionData,
  getUserByCustomerIdFromSub,
  getSubscriptionById,
} from "@/utils/api-helpers/stripe/webhookHelpers";

import { updateSubscription } from "@/utils/prisma/stripe/subscriptions";

/**
 * This event handler endpoint deals with the invoice.paid event.
 *
 * What should we do here?
 *    - Update the subscription
 *
 */
export const handleInvoicePaidEvent = async (event: Stripe.Event) => {
  try {
    const invoice = event.data.object as Stripe.Invoice;


    const subscriptionLine = invoice.lines.data.find(
      (line) => line.parent?.subscription_item_details
    );

    const subscriptionId =
      subscriptionLine?.parent?.subscription_item_details?.subscription;
    if (!subscriptionId) throw new Error("No subscription ID found on invoice");

    const subscription = await getSubscriptionById(subscriptionId);
    if (!subscription) throw new Error("Subscription object was not found");

    let customerId: string | null = getUserByCustomerIdFromSub(subscription);
    if (!customerId) throw new Error("Could not retrieve the customer id");
    const user = await getUserByCustomerId(customerId);

    if (!user)
      throw new Error("User not found for the subscription deleted event.");

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
