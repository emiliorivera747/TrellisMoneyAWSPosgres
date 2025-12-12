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

import { getSubscriptionItem } from "@/utils/api-helpers/stripe/webhookHelpers";

import { Subscription } from "@/types/stripe";


/**
 * Handles the checkout session completed event from Stripe.
 * Optimized to batch database operations where possible
 *
 * @param event
 */
export const handleCheckoutSessionCompleted = async (event: Stripe.Event) => {
  const { line_items, subscription, customer, customer_details } =
    await getCheckoutSession(event);

  const customer_id = customer as string;
  const { email } = customer_details ?? {};

  if (!email) throw new Error("Customer email not found in session");

  // ----- Find the user -----
  const user = await getUserByEmail(email);

  if (!user) throw new Error("User not found");
  const user_id = user.user_id;

  // ----- Process line items -----
  const lineItems = line_items?.data ?? [];

  const subscriptionItem = getSubscriptionItem(lineItems);

  if (subscriptionItem) {
    const priceId = subscriptionItem.price?.id;

    if (!priceId) return;

    if (!subscription) throw new Error("Subscription is null");

    if (subscription && typeof subscription === "object") {
      const subscriptionData: Subscription = {
        subscription_id: subscription.id,
        user_id,
        customer_id,
        price_id: priceId,
        status: subscription.status as Subscription["status"],
        start_date: subscription.start_date,
        current_period_start: 
          subscription.current_period_start,
        current_period_end: new Date(subscription.current_period_end * 1000),
        trial_start: subscription.trial_start
          ? new Date(subscription.trial_start * 1000)
          : undefined,
        trial_end: subscription.trial_end
          ? new Date(subscription.trial_end * 1000)
          : undefined,
        ended_at: subscription.ended_at
          ? new Date(subscription.ended_at * 1000)
          : undefined,
        canceled_at: subscription.canceled_at
          ? new Date(subscription.canceled_at * 1000)
          : undefined,
        cancel_at_period_end: subscription.cancel_at_period_end,
        created_at: new Date(),
        updated_at: new Date(),
      };
    }

    // ----- Batch user and subscription updates in a single transaction ------
    await prisma.$transaction([
      prisma.user.update({
        where: { user_id },
        data: {
          customer_id,
        },
      }),

      prisma.subscription.upsert({
        where: { user_id },
        update: subscriptionData,
        create: {
          ...subscriptionData,
          user_id: user.user_id,
        },
      }),
    ]);
  } else if (!user.customer_id) {
    await updateCustomerId(user.user_id, customerId);
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
