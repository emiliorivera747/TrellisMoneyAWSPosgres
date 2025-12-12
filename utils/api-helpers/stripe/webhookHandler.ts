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
    const price_id = subscriptionItem.price?.id;

    if (!price_id) return;

    if (!subscription) throw new Error("Subscription is null");

    if (subscription && typeof subscription === "object") {
      
      const subscriptionData = generateSubscription({
        subscription,
        customer_id,
        price_id,
        user_id,
      });

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
          },
        }),
      ]);
    }
  } else if (!user.customer_id) {
    await updateCustomerId(user.user_id, customer_id);
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

const generateSubscription = ({
  subscription,
  customer_id,
  price_id,
  user_id,
}: {
  subscription: Stripe.Subscription;
  customer_id: string;
  price_id: string;
  user_id: string;
}) => {
  const subscriptionData: Subscription = {
    subscription_id: subscription.id,
    user_id,
    customer_id,
    price_id,
    status: subscription.status as Subscription["status"],
    start_date: subscription.start_date ?? 0,
    trial_start: subscription.trial_start ?? 0,
    trial_end: subscription.trial_end ?? 0,
    ended_at: subscription.ended_at ?? 0,
    cancel_at: subscription.cancel_at ?? 0,
    cancel_at_period_end: subscription.cancel_at_period_end ?? false,
    canceled_at: subscription.canceled_at ?? 0,
    created_at: subscription.created ?? 0,
    updated_at: Math.floor(Date.now() / 1000),
  };

  return subscriptionData;
};
