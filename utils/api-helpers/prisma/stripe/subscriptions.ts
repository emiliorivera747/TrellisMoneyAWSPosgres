import { prisma } from "@/lib/prisma";

import { Subscription } from "@/types/stripe";

interface updateUserAndSubscriptionProps {
  user_id: string;
  customer_id: string;
  subscriptionData: Subscription;
}

/**
 * Updates the user and their subscription information in the database.
 *
 * This function performs a database transaction to update the `user` table with the
 * provided `customer_id` and either updates or creates a subscription record in the
 * `subscription` table with the provided `subscriptionData`.
 *
 * @param {Object} params - The parameters for updating the user and subscription.
 * @param {string} params.user_id - The unique identifier of the user to be updated.
 * @param {string} params.customer_id - The Stripe customer ID associated with the user.
 * @param {Object} params.subscriptionData - The subscription data to be updated or created.
 *
 * @returns {Promise<[User, Subscription]>} A promise that resolves to an array containing
 * the updated user and subscription records.
 *
 * @throws {Prisma.PrismaClientKnownRequestError} Throws if the transaction fails due to
 * database constraints or other known Prisma errors.
 * @throws {Prisma.PrismaClientUnknownRequestError} Throws if an unknown error occurs during
 * the transaction.
 *
 * @example
 * const result = await updateUserAndSubscription({
 *   user_id: '123',
 *   customer_id: 'cus_ABC123',
 *   subscriptionData: {
 *     plan: 'premium',
 *     status: 'active',
 *   },
 * });
 * console.log(result);
 */
export const updateUserAndSubscription = async ({
  user_id,
  customer_id,
  subscriptionData,
}: updateUserAndSubscriptionProps) => {
  const res = await prisma.$transaction([
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

  return res;
};

/**
 * Deactivates a user's subscription by updating the subscription details in the database.
 *
 * @param user_id - The unique identifier of the user whose subscription is being deactivated.
 * @param subscription - The subscription object containing the updated subscription details.
 * 
 * The `subscription` object should include the following properties:
 * - `status`: The current status of the subscription.
 * - `start_date`: The start date of the subscription.
 * - `trial_start`: The start date of the trial period, if applicable.
 * - `trial_end`: The end date of the trial period, if applicable.
 * - `ended_at`: The timestamp when the subscription ended, if applicable.
 * - `cancel_at`: The timestamp when the subscription is scheduled to be canceled, if applicable.
 * - `cancel_at_period_end`: A boolean indicating whether the subscription will be canceled at the end of the current billing period.
 * - `canceled_at`: The timestamp when the subscription was canceled, if applicable.
 * - `updated_at`: The timestamp when the subscription was last updated.
 * 
 * @returns A promise that resolves when the subscription is successfully updated in the database.
 */
export const deactivateSubscription = async (
  user_id: string,
  subscription: Subscription
) => {
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
  } = subscription;

  const res = await prisma.subscription.update({
    where: {
      user_id,
    },
    data: {
      status,
      start_date,
      trial_start,
      trial_end,
      ended_at,
      cancel_at,
      cancel_at_period_end,
      canceled_at,
      updated_at,
    },
  });

  return res;
};
