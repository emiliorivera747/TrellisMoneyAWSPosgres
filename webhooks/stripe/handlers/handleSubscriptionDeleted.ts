import Stripe from "stripe";
import { getSubscriptionByEvent } from "@/services/stripe/getSubscription";
import { getUserByCustomerId } from "@/utils/prisma/user/user";
import {
  generateSubscriptionData,
  getCustomerIdFromSub,
} from "@/utils/api-helpers/stripe/webhookHelpers";
import { updateSubscription } from "@/utils/prisma/stripe/subscriptions";
import { logError } from "@/utils/api-helpers/errors/logError";

/**
 * Handles subscription deletion event from Stripe
 * Optimized to batch user and subscription updates in a single transaction
 *
 * @param event
 */
const handleSubscriptionDeleted = async (event: Stripe.Event) => {
  try {
    const subscription = await getSubscriptionByEvent(event);

    // ---- get the Customer id -----
    let customerId: string | null = getCustomerIdFromSub(subscription);
    if (!customerId) throw new Error("Could not retrieve the customer id");
    
    const user = await getUserByCustomerId(customerId);
    if (!user)
      return logError("User not found for the subscription deleted event.");

    const subscriptionData = generateSubscriptionData({
      subscription,
      customer_id: customerId as string,
      user_id: user.user_id,
    });

    await updateSubscription(user.user_id, subscriptionData);
  } catch (error) {
    console.error("Error in handleSubscriptionDeleted:", error);
  }
};

export default handleSubscriptionDeleted;
