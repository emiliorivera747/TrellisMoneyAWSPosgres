import { MinmalSubscription } from "@/types/stripe";

/**
 * Determines if a subscription is active based on its status and cancellation time.
 *
 * @param sub - The subscription object to evaluate. It can be of type `MinmalSubscription` or `null`.
 * @returns `true` if the subscription is active or in a trialing state and has not been canceled yet; otherwise, `false`.
 *
 * The function checks:
 * - If the subscription exists.
 * - If the subscription's status is either "active" or "trialing".
 * - If the subscription has not been canceled (`cancel_at` is either `null` or a timestamp in the future).
 */
export const hasActiveSubscription = (
  sub: MinmalSubscription | null
): boolean => {
  if (!sub) return false;

  const now = Math.floor(Date.now() / 1000);

  return (
    ["active", "trialing"].includes(sub.status) &&
    (!sub.cancel_at || sub.cancel_at > now)
  );
};
