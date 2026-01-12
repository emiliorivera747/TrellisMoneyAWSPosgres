import Stripe from "stripe";

// Stripe
import { getStripeCheckoutSession } from "@/services/stripe/sessions";

// Utils
import { logErrorAndThrow } from "@/utils/api-helpers/errors/logAndThrowError";
import { getUserByEmail } from "@/utils/drizzle/user/user";
import { getSubscriptionItemFromSubscription } from "@/utils/api-helpers/stripe/webhookHelpers";
import { generateSubscriptionData } from "@/webhooks/stripe/helpers/subscriptions";
import { updateUserAndSubscription } from "@/utils/drizzle/stripe/subscriptions";

/**
 * Handles the checkout session completed event from Stripe.
 * Optimized to batch database operations where possible.
 *
 * @param event - The Stripe event object containing session details.
 */
const handleCheckoutSessionCompleted = async (event: Stripe.Event) => {
  const handlerName = `handleCheckoutSessionCompleted`;
  try {
    // ----- Get the checkout session -----
    const { subscription, customer, customer_email, mode } =
      await getStripeCheckoutSession(event);

    // ----- Does customer have email? -----
    if (!customer_email)
      return logErrorAndThrow("Customer email not found in session");

    // ----- Find the user -----
    const user = await getUserByEmail(customer_email);
    if (!user) return logErrorAndThrow("User not found");

    // ----- If we have a subscription -----
    if (
      subscription &&
      typeof subscription === "object" &&
      mode === "subscription"
    ) {
      const subscriptionItem =
        getSubscriptionItemFromSubscription(subscription);

      if (!subscriptionItem?.price)
        return logErrorAndThrow(
          `No recurring price found for subscription ${subscription.id}`
        );

      const price_id = subscriptionItem.price.id;

      // ---- Get subscription data to update the subscription -----
      const subscriptionData = generateSubscriptionData({
        subscription,
        customer_id: customer as string,
        price_id,
        user_id: user.userId,
      });
      if (!subscriptionData)
        return logErrorAndThrow(
          `${handlerName}: Failed to generate subscription data`
        );

      // ----- Batch user and subscription updates in a single transaction -----
      const upsertSubscription = await updateUserAndSubscription({
        userId: user.userId,
        customerId: customer as string,
        subscriptionData,
      });
      if (!upsertSubscription)
        return logErrorAndThrow(
          `${handlerName}: Failed to upsert subscription`
        );

      // ----- Log subscription update -----
      console.log(
        `Subscription ${subscription.id} updated for user ${user.userId} – status: ${subscription.status}`
      );
    }
  } catch (error) {
    console.error("Error in handleCheckoutSessionCompleted:", error);
  }
};

export default handleCheckoutSessionCompleted;
