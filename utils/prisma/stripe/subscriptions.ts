// Drizzle
import { db } from "@/drizzle/db";
import { subscription, user, Subscription } from "@/drizzle/schema";
import { eq } from "drizzle-orm";

// Types
import { UpdateUserAndSubscriptionProps } from "@/types/utils/stripe/subscriptions";

/**
 * Updates user and subscription in the database within a transaction.
 *
 * @param params - Contains userId, customerId, and subscriptionData.
 * @returns Promise<[User, Subscription]> Updated records.
 *
 * @throws PrismaClient errors on failure.
 */
export const updateUserAndSubscription = async ({
  userId,
  customerId,
  subscriptionData,
}: UpdateUserAndSubscriptionProps) => {
  
  const {
    status,
    startDate,
    trialStart,
    trialEnd,
    endedAt,
    cancelAt,
    cancelAtPeriodEnd,
    canceledAt,
    updatedAt,
  } = subscriptionData;

  const res = db.transaction(async (tx) => {
    tx.update(user).set({
      customerId,
    });

    tx.insert(subscription)
      .values({
        ...subscriptionData,
        userId,
        customerId: customerId,
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
  const res = await db
    .update(subscription)
    .set({
      ...subscriptionData,
      userId,
    })
    .where(eq(subscription.userId, userId))
    .returning();

  return res;
};
