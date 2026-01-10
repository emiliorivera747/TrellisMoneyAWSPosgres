import { Subscription } from "@/types/services/stripe/stripe";

/**
 * Represents the properties required to update a user and their subscription.
 * 
 * @property user_id - The unique identifier of the user.
 * @property customer_id - The unique identifier of the Stripe customer associated with the user.
 * @property subscriptionData - The subscription details for the user, represented as a `Subscription` object.
 */
export interface UpdateUserAndSubscriptionProps {
  user_id: string;
  customer_id: string;
  subscriptionData: Subscription;
}
