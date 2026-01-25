// import { Subscription } from "@/types/services/stripe/stripe";
import { Subscription } from "@/drizzle/schema";
import Stripe from "stripe";

/**
 * Represents the properties required to update a user and their subscription.
 *
 * @property user_id - The unique identifier of the user.
 * @property customer_id - The unique identifier of the Stripe customer associated with the user.
 * @property subscriptionData - The subscription details for the user, represented as a `Subscription` object.
 */
export interface UpdateUserAndSubscriptionProps {
  userId: string;
  customerId: string;
  subscriptionData: Subscription;
}

/**
 * Properties for generating subscription data.
 * @export
 * @interface GenerateSubscriptionDataProps
 */
export interface GenerateSubscriptionDataProps {
  /**
   * The Stripe subscription object.
   * @type {Stripe.Subscription}
   * @memberof GenerateSubscriptionDataProps
   */
  subscription: Stripe.Subscription;

  /**
   * The Stripe customer ID.
   * @type {string}
   * @memberof GenerateSubscriptionDataProps
   */
  customer_id: string;

  /**
   * The Stripe price ID associated with the subscription.
   * @type {string}
   * @memberof GenerateSubscriptionDataProps
   */
  price_id?: string;

  /**
   * The user ID associated with the subscription.
   * @type {string}
   * @memberof GenerateSubscriptionDataProps
   */
  user_id: string;
}
