import Stripe from "stripe";

import {
  getCheckoutSession,
  getSubscriptionSession,
} from "@/utils/api-helpers/stripe/getSessions";

import {
  getUserByEmail,
  getUserByCustomerId,
} from "@/utils/api-helpers/prisma/user/user";

import {
  getSubscriptionItemFromSubscription,
  generateSubscriptionData,
  getUserByCustomerIdFromSub,
} from "@/utils/api-helpers/stripe/webhookHelpers";

import updateUserAndSubscription from "@/utils/api-helpers/prisma/stripe/updateUserAndSubscription";

/**
 * Handles the checkout session completed event from Stripe.
 * Optimized to batch database operations where possible
 *
 * @param event
 */
export const handleCheckoutSessionCompleted = async (event: Stripe.Event) => {
  try {
    // ----- Get the checkout session -----
    const { subscription, customer, customer_email, mode } =
      await getCheckoutSession(event);

    // ----- Does customer have email? ----
    if (!customer_email) throw new Error("Customer email not found in session");

    // ----- Find the user -----
    const user = await getUserByEmail(customer_email);
    if (!user) throw new Error("User not found");

    // ----- If we have a subscription -----
    if (
      subscription &&
      typeof subscription === "object" &&
      mode === "subscription"
    ) {
      const subscriptionItem =
        getSubscriptionItemFromSubscription(subscription);

      if (!subscriptionItem?.price) throw new Error("No recurring price found");

      const price_id: string = subscriptionItem.price.id;

      const subscriptionData = generateSubscriptionData({
        subscription,
        customer_id: customer as string,
        price_id,
        user_id: user.user_id,
      });

      // ----- Batch user and subscription updates in a single transaction ------
      await updateUserAndSubscription({
        user_id: user.user_id,
        customer_id: customer as string,
        subscriptionData,
      });
    }
  } catch (error) {
    console.error("Error in handleCheckoutSessionCompleted:", error);
  }
};

/**
 * Handles subscription deletion event from Stripe
 * Optimized to batch user and subscription updates in a single transaction
 *
 * @param event
 */
export const handleSubscriptionDeleted = async (event: Stripe.Event) => {
  try {
    const subscription = await getSubscriptionSession(event);

    // ---- get the Customer id -----
    let customerId: string | null = getUserByCustomerIdFromSub(subscription);
    if (!customerId) throw new Error("Could not retrieve the customer id");
    const user = await getUserByCustomerId(customerId);

    if (!user)
      throw new Error("User not found for the subscription deleted event.");

    // ----- Update user and subscription in a single transaction -----
    // await prisma.$transaction([
    //   prisma.user.update({
    //     where: { user_id: user.user_id },
    //     data: { plan: "free" },
    //   }),
    //   prisma.subscription.update({
    //     where: { user_id: user.user_id },
    //     data: {
    //       plan: "free",
    //       status: "inactive",
    //       end_date: new Date(),
    //     },
    //   }),
    // ]);
  } catch (error) {
    console.error("Error in handleCheckoutSessionCompleted:", error);
  }
};
