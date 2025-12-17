import Stripe from "stripe";

// Utils
import { logError } from "@/utils/api-helpers/errors/logError";

// Helpers
import { generateSubscriptionData } from "@/webhooks/stripe/helpers/subscriptions";
import { getCustomerIdFromSub } from "../helpers/customers";
import { getUserByCustomerId } from "@/utils/prisma/user/user";
import { updateSubscription } from "@/utils/prisma/stripe/subscriptions";

// Stripe
import { getStripeSubscriptionByEvent } from "@/services/stripe/subscriptions";

/**
 * Handles customer.subscription.updated event.
 *
 * This event triggers on ANY change to a subscription.
 * We sync the latest subscription state to our database to keep it in sync.
 * We do NOT send emails or revoke/grant access here — those are handled in
 * more specific events (e.g., invoice.paid, invoice.payment_failed, subscription.deleted).
 */
const handleSubscriptionUpdated = async (event: Stripe.Event) => {
  try {
    
    // Direct helper to get subscription from event (common pattern)
    const subscription = await getStripeSubscriptionByEvent(event);
    if (!subscription) return logError("Subscription object not found in subscription.updated event");

    const customer_id = getCustomerIdFromSub(subscription);
    if (!customer_id) return logError("Customer ID not found on subscription");
    

    const user = await getUserByCustomerId(customer_id);
    if (!user) return logError(`User not found for Stripe customer ${customer_id}`);
    

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
    // Do NOT re-throw — we must acknowledge the webhook with 200
  }
};

export default handleSubscriptionUpdated;