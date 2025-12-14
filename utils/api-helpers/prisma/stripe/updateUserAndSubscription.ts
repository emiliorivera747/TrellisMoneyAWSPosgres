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
const updateUserAndSubscription = async ({
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

export default updateUserAndSubscription;
