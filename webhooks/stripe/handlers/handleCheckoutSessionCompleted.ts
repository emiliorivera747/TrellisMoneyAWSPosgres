import Stripe from "stripe";
import { getStripeCheckoutSession } from "@/services/stripe/sessions";
import { getUserByEmail } from "@/utils/prisma/user/user";
import {
  getSubscriptionItemFromSubscription,
  generateSubscriptionData,
} from "@/utils/api-helpers/stripe/webhookHelpers";
import updateUserAndSubscription from "@/utils/prisma/stripe/updateUserAndSubscription";
import { logError } from "@/utils/api-helpers/errors/logError";

/**
 * Handles the checkout session completed event from Stripe.
 * Optimized to batch database operations where possible.
 *
 * @param event - The Stripe event object containing session details.
 */
const handleCheckoutSessionCompleted = async (event: Stripe.Event) => {
  try {
    
    // ----- Get the checkout session -----
    const { subscription, customer, customer_email, mode } =
      await getStripeCheckoutSession(event);

    // ----- Does customer have email? -----
    if (!customer_email) {
      logError("Customer email not found in session");
      return;
    }

    // ----- Find the user -----
    const user = await getUserByEmail(customer_email);
    if (!user) {
      logError("User not found");
      return;
    }

    // ----- If we have a subscription -----
    if (
      subscription &&
      typeof subscription === "object" &&
      mode === "subscription"
    ) {
      const subscriptionItem =
        getSubscriptionItemFromSubscription(subscription);

      if (!subscriptionItem?.price) {
        logError("No recurring price found");
        return;
      }

      const price_id: string = subscriptionItem.price.id;

      // ---- Get subscription data to update the subscription -----
      const subscriptionData = generateSubscriptionData({
        subscription,
        customer_id: customer as string,
        price_id,
        user_id: user.user_id,
      });

      // ----- Batch user and subscription updates in a single transaction -----
      await updateUserAndSubscription({
        user_id: user.user_id,
        customer_id: customer as string,
        subscriptionData,
      });

      // ----- Log subscription update -----
      console.log(
        `Subscription ${subscription.id} updated for user ${user.user_id} – status: ${subscription.status}`
      );
    }
  } catch (error) {
    console.error("Error in handleCheckoutSessionCompleted:", error);
  }
};

export default handleCheckoutSessionCompleted;
