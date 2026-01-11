import { subscription } from "@/src/drizzle/schema/schema";

export type Subscription = typeof subscription.$inferSelect;

/**
 * Checks if any subscription is 'trialing' or 'active'.
 *
 * @param subscriptions - Array of `Subscription` objects.
 * @returns `true` if at least one subscription is active, otherwise `false`.
 */
export const hasActiveSubscription = (subscriptions: Subscription[]) => {
  if (!subscriptions || subscriptions.length === 0) return false;
  const activeStatuses = ["trialing", "active"];
  return subscriptions.some((subscription) =>
    activeStatuses.includes(subscription.status)
  );
};

/**
 * Determines the base redirect URL based on environment and headers.
 */
export function getRedirectBase(request: Request, origin: string): string {
  const forwardedHost = request.headers.get("x-forwarded-host");
  const isLocalEnv = process.env.NODE_ENV === "development";
  if (isLocalEnv) return origin;
  if (forwardedHost) return `https://${forwardedHost}`;
  return origin;
}
