import { Subscription } from "@prisma/client";

/**
 * Determines if there is at least one active subscription in the provided list.
 *
 * @param subscriptions - An array of `Subscription` objects to check.
 * @returns `true` if there is at least one subscription with a status of 'trialing' or 'active',
 *          otherwise `false`.
 *
 * @remarks
 * - The function returns `false` if the `subscriptions` array is empty or not provided.
 * - The `activeStatuses` array defines the statuses considered as "active".
 *
 * @example
 * ```typescript
 * const subscriptions = [
 *   { status: 'trialing' },
 *   { status: 'canceled' }
 * ];
 * const result = hasActiveSubscription(subscriptions);
 * console.log(result); // Output: true
 * ```
 */
export const hasActiveSubscription = (subscriptions: Subscription[]) => {
    if (!subscriptions || subscriptions.length === 0) return false;
    const activeStatuses = ['trialing', 'active'];
    return subscriptions.some(subscription => activeStatuses.includes(subscription.status));
};
