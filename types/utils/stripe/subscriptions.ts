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

export interface GenerateSubscriptionDataProps {
  subscription: Stripe.Subscription;
  customer_id: string;
  price_id?: string;
  user_id: string;
}
