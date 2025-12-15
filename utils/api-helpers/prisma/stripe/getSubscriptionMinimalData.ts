import { prisma } from "@/lib/prisma";

/**
 * Retrieves minimal subscription data for a given user ID.
 *
 * @param user_id - The unique identifier of the user whose subscription data is being retrieved.
 * @returns A promise that resolves to an object containing the subscription's minimal data:
 *          - `status`: The current status of the subscription.
 *          - `cancel_at`: The timestamp indicating when the subscription is scheduled to be canceled, if applicable.
 *          - `cancel_at_period_end`: A boolean indicating whether the subscription is set to cancel at the end of the current billing period.
 *          Returns `null` if no subscription is found for the given user ID.
 *
 * @throws Will throw an error if the database query fails.
 */
const getSubscriptionMinimalData = async (user_id: string) => {
  
  const subscription = await prisma.subscription.findUnique({
    where: { user_id },
    select: { status: true, cancel_at: true, cancel_at_period_end: true },
  });

  if (!subscription) return null;

  return subscription;
};

export default getSubscriptionMinimalData;
