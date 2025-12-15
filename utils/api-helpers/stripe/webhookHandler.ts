import Stripe from "stripe";
import { prisma } from "@/lib/prisma";

import {
  getCheckoutSession,
  getSubscriptionSession,
} from "@/utils/api-helpers/stripe/getSessions";

import {
  getUserByEmail,
  updateCustomerId,
  getUserByCustomerId,
} from "@/utils/api-helpers/prisma/user/user";

import {
  getSubscriptionItemFromSubscription,
  generateSubscription,
} from "@/utils/api-helpers/stripe/webhookHelpers";

import updateUserAndSubscription from "@/utils/api-helpers/prisma/stripe/updateUserAndSubscription";

/**
 * Handles the checkout session completed event from Stripe.
 * Optimized to batch database operations where possible
 *
 * @param event
 */
export const handleCheckoutSessionCompleted = async (event: Stripe.Event) => {
  // ----- Get the checkout session -----
  const { subscription, customer, customer_details } = await getCheckoutSession(
    event
  );

  // ----- Get the customers email ----
  const { email } = customer_details ?? {};
  if (!email) throw new Error("Customer email not found in session");

  // ----- Find the user -----
  const user = await getUserByEmail(email);
  if (!user) throw new Error("User not found");

  if (subscription && typeof subscription === "object") {
    const subscriptionItem = getSubscriptionItemFromSubscription(subscription);

    if (!subscriptionItem?.price)
      throw new Error("No recurring price found on subscription");

    const price_id: string = subscriptionItem.price.id;

    const subscriptionData = generateSubscription({
      subscription,
      customer_id: customer as string,
      price_id,
      user_id: user.user_id,
    });

    // ----- Batch user and subscription updates in a single transaction ------
    const res = await updateUserAndSubscription({
      user_id: user.user_id,
      customer_id: customer as string,
      subscriptionData,
    });

    if (!res) throw new Error("failed to update subscription");
  }
};

/**
 * Handles subscription deletion event from Stripe
 * Optimized to batch user and subscription updates in a single transaction
 *
 * @param event
 */
export const handleSubscriptionDeleted = async (event: Stripe.Event) => {
  const subscription = await getSubscriptionSession(event);

  // ---- get the Customer id -----
  const customerId =
    typeof subscription.customer === "string"
      ? subscription.customer
      : subscription.customer?.id;
  if (!customerId) throw new Error("Customer ID not found in subscription.");

  const user = await getUserByCustomerId(customerId);
  if (!user)
    throw new Error("User not found for the subscription deleted event.");

  // ----- Update user and subscription in a single transaction -----
  await prisma.$transaction([
    prisma.user.update({
      where: { user_id: user.user_id },
      data: { plan: "free" },
    }),
    prisma.subscription.update({
      where: { user_id: user.user_id },
      data: {
        plan: "free",
        status: "inactive",
        end_date: new Date(),
      },
    }),
  ]);
};
