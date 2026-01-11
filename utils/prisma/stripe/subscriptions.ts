// Drizzle
import { db } from "@/src/drizzle/db";
import { subscription, user } from "@/src/drizzle/schema/schema";
import { eq } from "drizzle-orm";

// Types
import { UpdateUserAndSubscriptionProps } from "@/types/utils/stripe/subscriptions";
import { Subscription } from "@/types/services/stripe/stripe";

/**
 * Updates user and subscription in the database within a transaction.
 *
 * @param {Object} params - Parameters for the update.
 * @param {string} params.user_id - User ID.
 * @param {string} params.customer_id - Stripe customer ID.
 * @param {Object} params.subscriptionData - Subscription data to update or create.
 *
 * @returns {Promise<[User, Subscription]>} Updated user and subscription records.
 *
 * @throws {Prisma.PrismaClientKnownRequestError | Prisma.PrismaClientUnknownRequestError}
 *
 * @example
 * const result = await updateUserAndSubscription({
 *   user_id: '123',
 *   customer_id: 'cus_ABC123',
 *   subscriptionData: { plan: 'premium', status: 'active' },
 * });
 */
export const updateUserAndSubscription = async ({
  user_id,
  customer_id,
  subscriptionData,
}: UpdateUserAndSubscriptionProps) => {
  // const res = await prisma.$transaction([
  //   prisma.user.update({
  //     where: { user_id },
  //     data: {
  //       customer_id,
  //     },
  //   }),

  //   prisma.subscription.upsert({
  //     where: { user_id },
  //     update: subscriptionData,
  //     create: {
  //       ...subscriptionData,
  //     },
  //   }),
  // ]);

  const {
    status,
    start_date: startDate,
    trial_start: trialStart,
    trial_end: trialEnd,
    ended_at: endedAt,
    cancel_at: cancelAt,
    cancel_at_period_end: cancelAtPeriodEnd,
    canceled_at: canceledAt,
    updated_at: updatedAt,
    subscription_id: subscriptionId,
  } = subscriptionData;

  const res = db.transaction(async (tx) => {
    tx.update(user).set({
      customerId: customer_id,
    });

    tx.insert(subscription)
      .values({
        userId: user_id,
        customerId: customer_id,
        subscriptionId,
        startDate,
        trialStart,
        trialEnd,
        endedAt,
        cancelAt,
        cancelAtPeriodEnd,
        canceledAt,
        updatedAt,
        status: status,
      })
      .onConflictDoUpdate({
        target: subscription.subscriptionId,
        set: {
          status,
          startDate,
          trialStart,
          trialEnd,
          endedAt,
          cancelAt,
          cancelAtPeriodEnd,
          canceledAt,
          updatedAt,
        },
      });
  });
  return res;
};

/**
 * Updates a user's subscription in the database.
 *
 * @param user_id - User's unique identifier.
 * @param subscription - Subscription details to update.
 * @returns Updated subscription record.
 *
 * @throws Error if the update fails.
 */
export const updateSubscription = async (
  userId: string,
  subscriptionData: Subscription
) => {
  // const res = await prisma.subscription.update({
  //   where: {
  //     user_id,
  //   },
  //   data: {
  //     status,
  //     start_date,
  //     trial_start,
  //     trial_end,
  //     ended_at,
  //     cancel_at,
  //     cancel_at_period_end,
  //     canceled_at,
  //     updated_at,
  //   },
  // });

  const {
    status,
    start_date,
    trial_start,
    trial_end,
    ended_at,
    cancel_at,
    cancel_at_period_end,
    canceled_at,
    updated_at,
  } = subscriptionData;

  const res = await db
    .update(subscription)
    .set({
      status,
      startDate: start_date,
      trialStart: trial_start,
      trialEnd: trial_end,
      endedAt: ended_at,
      cancelAt: cancel_at,
      cancelAtPeriodEnd: cancel_at_period_end,
      canceledAt: canceled_at,
      updatedAt: updated_at,
    })
    .where(eq(subscription.userId, userId))
    .returning();

  return res;
};
