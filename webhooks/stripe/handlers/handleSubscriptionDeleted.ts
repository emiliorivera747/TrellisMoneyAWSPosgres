import Stripe from "stripe";
import { getStripeSubscriptionByEvent } from "@/services/stripe/subscriptions";

import { updateSubscription } from "@/utils/prisma/stripe/subscriptions";

// Helpers
import { logError } from "@/utils/api-helpers/errors/logError";
import { generateSubscriptionDataFromSubscription } from "@/webhooks/stripe/helpers/subscriptions";

/**
 * Handles subscription deletion event from Stripe
 * Optimized to batch user and subscription updates in a single transaction
 *
 * @param event
 */
const handleSubscriptionDeleted = async (event: Stripe.Event) => {
  try {
    const subscription = await getStripeSubscriptionByEvent(event);

    const res = await generateSubscriptionDataFromSubscription(subscription);
    if (!res)
      return logError(
        "Failed to generate subscription from Stripe subscription"
      );
    await updateSubscription(res.user_id, res.subscriptionData);

    console.log(
      `Subscription ${subscription.id} updated for user ${res.user_id} – status: ${subscription.status}`
    );
  } catch (error) {
    console.error("Error in handleSubscriptionDeleted:", error);
  }
};

export default handleSubscriptionDeleted;
