import Stripe from "stripe";
import { stripe } from "@/lib/stripe";
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


interface SubscriptionData {
  plan: "premium";
  period: "monthly" | "yearly";
  start_date: Date;
  end_date: Date;
  status: "active";
}

/**
 * Handles the checkout session completed event from Stripe.
 * Optimized to batch database operations where possible
 *
 * @param event
 */
export const handleCheckoutSessionCompleted = async (event: Stripe.Event) => {
  const session = await getCheckoutSession(event);

  const customerId = session.customer as string;
  const { email } = session.customer_details ?? {};

  if (!email) throw new Error("Customer email not found in session");

  // ----- Find the user -----
  const user = await getUserByEmail(email);

  if (!user) throw new Error("User not found");

  // ----- Process line items -----
  const lineItems = session.line_items?.data ?? [];

  const subscriptionItem = lineItems.find((item) => {
    const priceId = item.price?.id;
    const isSubscription = !!item.price?.recurring;
    return priceId && isSubscription;
  });

  if (subscriptionItem) {
    const priceId = subscriptionItem.price?.id;
    if (!priceId) return;

    const subscriptionData = await getSubscriptionData(priceId);

    // ----- Batch user and subscription updates in a single transaction ------
    await prisma.$transaction([
      prisma.user.update({
        where: { user_id: user.user_id },
        data: {
          customer_id: user.customer_id ? undefined : customerId,
          plan: "premium",
        },
      }),

      prisma.subscription.upsert({
        where: { user_id: user.user_id },
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

/**
 *
 * Calculates the subscription data based on the price ID.
 *
 * @param priceId
 * @returns
 */
export const getSubscriptionData = async (
  priceId: string
): Promise<SubscriptionData> => {
  const price = await stripe.prices.retrieve(priceId);

  return {
    plan: "premium",
    period: "monthly",
    start_date: new Date(),
    end_date: new Date(),
    status: "active",
  };
};
