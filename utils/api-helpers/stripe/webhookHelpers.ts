import { stripe } from "@/lib/stripe";
import Stripe from "stripe";

const WEBHOOK_SECRET = process.env.STRIPE_WEBHOOK_SECRET as string;

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
 * Extracts the customer ID from a Stripe subscription object.
 *
 * This function checks the `customer` property of the provided Stripe subscription object.
 * If the `customer` is a string, it directly assigns it as the customer ID.
 * If the `customer` is an object and contains an `id` property, it extracts the `id` as the customer ID.
 * If neither condition is met, it returns `null`.
 *
 * @param subscription - The Stripe subscription object from which to extract the customer ID.
 * @returns The customer ID as a string if available, otherwise `null`.
 */
export const getCustomerIdFromSub = (
  subscription: Stripe.Subscription
) => {
  let customerId: string | null;

  if (typeof subscription.customer === "string") {
    customerId = subscription.customer;
  } else if ("id" in subscription.customer) {
    customerId = subscription.customer.id;
  } else {
    customerId = null;
  }

  return customerId;
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
