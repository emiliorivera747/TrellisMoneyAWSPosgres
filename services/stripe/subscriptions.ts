import Stripe from "stripe";
import { stripe } from "@/lib/stripe";

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
 * Retrieves a fully expanded Subscription (for subscription.* events)
 */
export const getSubscriptionByEvent = async (
  event: Stripe.Event
): Promise<Stripe.Subscription> => {
  const subscription = event.data.object as Stripe.Subscription;

  if (!subscription.id)
    throw new Error("Invalid subscription event: missing ID");

  return await stripe.subscriptions.retrieve(subscription.id, {
    expand: ["items.data.price", "items.data.price.product", "customer"],
  });
};
