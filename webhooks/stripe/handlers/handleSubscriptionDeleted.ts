import Stripe from "stripe";
import { getStripeSubscriptionByEvent } from "@/services/stripe/subscriptions";

import { updateSubscription } from "@/utils/prisma/stripe/subscriptions";

// Helpers
import { logError } from "@/utils/api-helpers/errors/logError";
import { generateSubscriptionDataFromSubscription } from "@/webhooks/stripe/helpers/subscriptions";


/**
 * Handles the deletion of a Stripe subscription.
 *
 * This function is triggered by a Stripe event and processes the deletion
 * of a subscription by retrieving the subscription details, generating
 * the necessary subscription data, and updating the subscription in the system.
 *
 * @param event - The Stripe event containing information about the subscription deletion.
 * @throws Will log an error if there is an issue retrieving the subscription,
 *         generating subscription data, or updating the subscription.
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
