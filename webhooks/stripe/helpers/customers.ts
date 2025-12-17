import Stripe from "stripe";

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
export const getCustomerIdFromSub = (subscription: Stripe.Subscription) => {
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
