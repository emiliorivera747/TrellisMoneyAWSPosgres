// import { UpdateUserAndSubscriptionProps } from "@/types/utils/stripe/subscriptions";

// /**
//  * Updates user and subscription in the database within a transaction.
//  *
//  * @param {Object} params - Update parameters.
//  * @param {string} params.user_id - User ID.
//  * @param {string} params.customer_id - Stripe customer ID.
//  * @param {Object} params.subscriptionData - Subscription data.
//  *
//  * @returns {Promise<[User, Subscription]>} Updated user and subscription records.
//  *
//  * @throws {Prisma.PrismaClientKnownRequestError} On transaction failure.
//  * @throws {Prisma.PrismaClientUnknownRequestError} On unknown errors.
//  */
// const updateUserAndSubscription = async ({
//   user_id,
//   customer_id,
//   subscriptionData,
// }: UpdateUserAndSubscriptionProps) => {
//   const res = await prisma.$transaction([
//     prisma.user.update({
//       where: { user_id },
//       data: {
//         customer_id,
//       },
//     }),

//     prisma.subscription.upsert({
//       where: { user_id },
//       update: subscriptionData,
//       create: {
//         ...subscriptionData,
//       },
//     }),
//   ]);

//   return res;
// };

// export default updateUserAndSubscription;
