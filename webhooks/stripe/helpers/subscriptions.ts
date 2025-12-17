import { MinmalSubscription } from "@/types/stripe";
import { stripe } from "@/lib/stripe";
import { Subscription } from "@/types/stripe";
import Stripe from "stripe";

// Utils
import { logError } from "@/utils/api-helpers/errors/logError";

import { getCustomerIdFromSub } from "@/webhooks/stripe/helpers/customers";
import { getUserByCustomerId } from "@/utils/prisma/user/user";

import { getSubscriptionFromInvoice } from "@/webhooks/stripe/helpers/invoice";

const WEBHOOK_SECRET = process.env.STRIPE_WEBHOOK_SECRET as string;

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
 * Generates a subscription object based on the provided Stripe subscription data
 * and additional parameters.
 *
 * @param {Object} params - The parameters for generating the subscription.
 * @param {Stripe.Subscription} params.subscription - The Stripe subscription object.
 * @param {string} params.customer_id - The ID of the customer associated with the subscription.
 * @param {string} params.price_id - The ID of the price associated with the subscription.
 * @param {string} params.user_id - The ID of the user associated with the subscription.
 *
 * @returns {Subscription} The generated subscription object containing normalized data.
 */
export const generateSubscriptionData = ({
  subscription,
  customer_id,
  price_id,
  user_id,
}: {
  subscription: Stripe.Subscription;
  customer_id: string;
  price_id?: string;
  user_id: string;
}) => {
  const subscriptionData: Subscription = {
    subscription_id: subscription.id,
    user_id: user_id,
    customer_id: customer_id,
    price_id: price_id ?? "",
    status: subscription.status as Subscription["status"],
    start_date: subscription.start_date ?? 0,
    trial_start: subscription.trial_start ?? 0,
    trial_end: subscription.trial_end ?? 0,
    ended_at: subscription.ended_at ?? 0,
    cancel_at: subscription.cancel_at ?? 0,
    cancel_at_period_end: subscription.cancel_at_period_end ?? false,
    canceled_at: subscription.canceled_at ?? 0,
    created_at: subscription.created ?? 0,
    updated_at: Math.floor(Date.now() / 1000),
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
 * Determines if the provided parameters indicate a subscription.
 *
 * @param {IsSubscriptionParams} params - The parameters to evaluate.
 * @param {unknown} params.subscription - The subscription object to check.
 * @param {string} params.mode - The mode to verify, expected to be "subscription".
 * @returns {boolean} `true` if the parameters indicate a subscription, otherwise `false`.
 *
 * @example
 * const result = isSubscription({ subscription: {}, mode: "subscription" });
 * console.log(result); // true
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
 * Retrieves a subscription from Stripe by its ID, including expanded details.
 *
 * @param subscriptionId - The unique identifier of the subscription to retrieve.
 * @returns A promise that resolves to the subscription object, including expanded details
 *          such as the subscription items, their prices, associated products, and the customer.
 *
 * @remarks
 * This function uses the Stripe API to fetch subscription details. The `expand` parameter
 * is used to include additional information about the subscription items, their prices,
 * the associated products, and the customer in the response.
 *
 * @throws Will throw an error if the subscription ID is invalid or if there is an issue
 *         with the Stripe API request.
 */
export const getSubscriptionById = async (subscriptionId: string) => {
  const subscription = await stripe.subscriptions.retrieve(subscriptionId, {
    expand: ["items.data.price", "items.data.price.product", "customer"],
  });

  return subscription;
};

/**
 * Generates subscription data from a Stripe invoice.
 *
 * This function retrieves the subscription associated with the given invoice,
 * extracts the customer ID, fetches the corresponding user, and generates
 * subscription data based on the retrieved information. If any step fails,
 * it logs an error and returns `null`.
 *
 * @param invoice - The Stripe invoice object used to generate subscription data.
 * @returns A promise that resolves to the generated subscription data object, or `null` if an error occurs.
 *
 * @throws Will log an error message if:
 * - The subscription object is not found.
 * - The customer ID is not found in the subscription.
 * - The user does not exist for the given customer ID.
 * - An unexpected error occurs during the process.
 */
export const generateSubscriptionDataFromInvoice = async (
  invoice: Stripe.Invoice
) => {
  try {
    const subscription = await getSubscriptionFromInvoice(invoice);
    if (!subscription) {
      logError("Subscription object was not found");
      return null;
    }

    const customer_id = getCustomerIdFromSub(subscription);
    if (!customer_id) {
      logError("Customer ID was not found in subscription");
      return null;
    }

    const user = await getUserByCustomerId(customer_id);
    if (!user) {
      logError("User does not exist with customer ID");
      return null;
    }

    const subscriptionData = generateSubscriptionData({
      subscription,
      customer_id,
      user_id: user.user_id,
    });

    return { subscriptionData, user_id: user.user_id, user };
  } catch (error) {
    logError(
      `Error generating subscription data from invoice: ${
        (error as Error).message
      }`
    );
    return null;
  }
};
