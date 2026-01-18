import { MinmalSubscription } from "@/types/services/stripe/stripe";
import Stripe from "stripe";
import { stripe } from "@/lib/stripe";

// Utils
import { logError } from "@/utils/api-helpers/errors/logError";
import { getUserByCustomerId } from "@/utils/drizzle/user/user";
import { logErrorAndThrow } from "@/utils/api-helpers/errors/logAndThrowError";
import { getCustomerIdFromSub } from "@/webhooks/stripe/helpers/customers";
import { getSubscriptionFromInvoice } from "@/webhooks/stripe/helpers/invoice";
import { unixToISO } from "@/utils/helper-functions/dates/conversions";

// Types
import { GenerateSubscriptionDataProps } from "@/types/utils/stripe/subscriptions";
import { Subscription } from "@/drizzle/schema";

const WEBHOOK_SECRET = process.env.STRIPE_WEBHOOK_SECRET as string;

/**
 * Checks if a subscription is active or trialing and not canceled.
 *
 * @param sub - The subscription object (`MinmalSubscription` or `null`).
 * @returns `true` if active or trialing and not canceled; otherwise, `false`.
 */
export const hasActiveSubscription = (
  sub: MinmalSubscription | null
): boolean => {
  if (!sub) return false;
  const now = Math.floor(Date.now() / 1000);
  return (
    ["active", "trialing"].includes(sub.status) &&
    (!sub.cancelAt || sub.cancelAt > now)
  );
};

/**
 *  Verifies the Stripe webhook signature.
 *
 */
export const verifyWebhookSignature = (
  body: string,
  signature: string
): Stripe.Event => {
  try {
    return stripe.webhooks.constructEvent(body, signature, WEBHOOK_SECRET);
  } catch (err) {
    throw new Error(`Signature verification failed: ${(err as Error).message}`);
  }
};

/**
 * Retrieves the subscription item from a list of Stripe line items.
 *
 * @param lineItems - An array of Stripe line items.
 * @returns The subscription item if found, otherwise undefined.
 */
export const getSubscriptionItemFromLineItems = (
  lineItems: Stripe.LineItem[]
) => {
  // Find the line item that represents a subscription
  const subscriptionItem = lineItems.find((item) => {
    const priceId = item.price?.id; // The price ID of the line item
    const isSubscription = !!item.price?.recurring; // Check if the price is recurring (indicating a subscription)
    return priceId && isSubscription; // Return true if both conditions are met
  });

  return subscriptionItem; // Return the subscription item or undefined
};

/**
 * Creates a normalized subscription object from Stripe data.
 *
 * @param params - Includes Stripe subscription, customer ID, price ID, and user ID.
 * @returns Normalized subscription object.
 */
export const generateSubscriptionData = ({
  subscription,
  customer_id,
  price_id,
  user_id,
}: GenerateSubscriptionDataProps) => {
  const subscriptionData = {
    subscriptionId: subscription.id,
    userId: user_id,
    stripeCustomerId: customer_id,
    priceId: price_id ?? "",
    status: subscription.status.toUpperCase() as Subscription["status"],
    
    startDate: unixToISO(subscription.start_date ?? 0),
    trialStart: unixToISO(subscription.trial_start ?? 0),
    trialEnd: unixToISO(subscription.trial_end ?? 0),
    endedAt: unixToISO(subscription.ended_at ?? 0),
    cancelAt: unixToISO(subscription.cancel_at ?? 0),

    cancelAtPeriodEnd: subscription.cancel_at_period_end ?? false,
    canceledAt: unixToISO(subscription.canceled_at ?? 0),
    createdAt: unixToISO(subscription.created ?? 0) || "",
    updatedAt: unixToISO(Math.floor(Date.now() / 1000)),
  };
  return subscriptionData;
};

/**
 * Retrieves the first subscription item from a Stripe subscription
 * that has a recurring price.
 *
 * @param subscription - The Stripe subscription object to extract the item from.
 * @returns The first subscription item with a recurring price, or `undefined` if none is found.
 */
export const getSubscriptionItemFromSubscription = (
  subscription: Stripe.Subscription
) => {
  const subscriptionItem = subscription.items.data.find(
    (item: Stripe.SubscriptionItem) => item.price.recurring !== null
  );
  return subscriptionItem;
};

/**
 * Checks if the given parameters represent a subscription.
 *
 * @param params - Contains `subscription` and `mode`.
 * @returns `true` if `mode` is "subscription" and `subscription` is an object.
 */
export const isSubscription = (
  subscription: string | Stripe.Subscription | null,
  mode: string
): boolean => {
  return (subscription &&
    typeof subscription === "object" &&
    mode === "subscription") as boolean;
};

/**
 * Generates subscription data from a Stripe invoice.
 *
 * Retrieves the subscription, customer ID, user, and creates subscription data.
 *
 * @param invoice - The Stripe invoice object.
 * @returns The subscription data, user ID, user, and customer ID, or `null` on error.
 */
export const generateSubscriptionDataFromInvoice = async (
  invoice: Stripe.Invoice
) => {
  try {
    const subscription = await getSubscriptionFromInvoice(invoice);
    if (!subscription)
      return logErrorAndThrow("Subscription object was not found");

    const customer_id = getCustomerIdFromSub(subscription);
    if (!customer_id)
      return logErrorAndThrow("Customer ID was not found in subscription");

    const user = await getUserByCustomerId(customer_id);
    if (!user) return logErrorAndThrow("User does not exist with customer ID");

    const subscriptionData = generateSubscriptionData({
      subscription,
      customer_id,
      user_id: user.userId,
    });

    return { subscriptionData, user_id: user.userId, user, customer_id };
  } catch (error) {
    logError(
      `Error generating subscription data from invoice: ${
        (error as Error).message
      }`
    );
    return null;
  }
};

/**
 * Generates subscription data from a Stripe subscription.
 *
 * Retrieves the customer ID, user, and creates subscription data.
 *
 * @param subscription - The Stripe subscription object.
 * @returns The subscription data, user ID, and user, or `null` on error.
 *
 * @throws If the customer ID cannot be retrieved.
 */
export const generateSubscriptionDataFromSubscription = async (
  subscription: Stripe.Subscription
) => {
  try {
    // ---- get the Customer id -----
    let customerId: string | null = getCustomerIdFromSub(subscription);
    if (!customerId) throw new Error("Could not retrieve the customer id");

    const user = await getUserByCustomerId(customerId);
    if (!user) return logError("User not found for the subscription event.");

    const subscriptionData = generateSubscriptionData({
      subscription,
      customer_id: customerId as string,
      user_id: user.userId,
    });

    return { subscriptionData, user_id: user.userId, user };
  } catch (error) {
    return logErrorAndThrow(
      `Error generating subscription data from subscription: ${
        (error as Error).message
      }`
    );
  }
};
