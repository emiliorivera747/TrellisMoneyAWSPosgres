import Stripe from "stripe";

// Utils
import { generateSubscriptionData } from "@/webhooks/stripe/helpers/subscriptions";
import { getCustomerIdFromSub } from "../helpers/customers";
import { getUserByCustomerId } from "@/utils/prisma/user/user";
import { updateSubscription } from "@/utils/prisma/stripe/subscriptions";
import { logError } from "@/utils/api-helpers/errors/logError";

// Stripe
import { getStripeSubscriptionByEvent } from "@/services/stripe/subscriptions";

/**
 * Handles the `subscription.updated` Stripe webhook event.
 *
 * This function processes the updated subscription event from Stripe, retrieves the associated
 * user and subscription details, and updates the local subscription record with the latest state.
 * It ensures that the webhook is acknowledged with a 200 status code even in case of errors.
 *
 * @param event - The Stripe event object representing the `subscription.updated` webhook event.
 *
 * @throws This function does not throw errors to ensure the webhook is acknowledged properly.
 *
 * @remarks
 * - The function uses helper utilities to extract the subscription, customer ID, and user details.
 * - It logs errors consistently using the `logError` utility.
 * - The function does not re-throw errors to prevent webhook acknowledgment failures.
 */
const handleSubscriptionUpdated = async (event: Stripe.Event) => {
  try {
    // Direct helper to get subscription from event (common pattern)
    const subscription = await getStripeSubscriptionByEvent(event);
    if (!subscription)
      return logError(
        "Subscription object not found in subscription.updated event"
      );

    const customer_id = getCustomerIdFromSub(subscription);
    if (!customer_id) return logError("Customer ID not found on subscription");

    const user = await getUserByCustomerId(customer_id);
    if (!user)
      return logError(`User not found for Stripe customer ${customer_id}`);

    // Generate the standardized data shape your updateSubscription expects
    const subscriptionData = generateSubscriptionData({
      subscription,
      customer_id,
      user_id: user.user_id,
    });

    // Update our local subscription record with the latest Stripe state
    await updateSubscription(user.user_id, subscriptionData);

    console.log(
      `Subscription ${subscription.id} updated for user ${user.user_id} – status: ${subscription.status}`
    );
  } catch (error) {
    // Use your shared logError utility for consistency
    logError("Error in handleSubscriptionUpdated");
  }
};

export default handleSubscriptionUpdated;
