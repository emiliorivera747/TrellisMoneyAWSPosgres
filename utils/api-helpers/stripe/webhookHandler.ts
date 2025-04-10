import Stripe from "stripe";
import { prisma } from "@/lib/prisma";
import { stripe } from "@/lib/stripe";

// Constants
const WEBHOOK_SECRET = process.env.STRIPE_WEBHOOK_SECRET as string;
const PRICE_IDS = {
  YEARLY: process.env.STRIPE_YEARLY_SUBSCRIPTION_PRICE_ID as string,
  MONTHLY: process.env.STRIPE_MONTHLY_SUBSCRIPTION_PRICE_ID as string,
};

interface SubscriptionData {
  plan: "premium";
  period: "monthly" | "yearly";
  start_date: Date;
  end_date: Date;
  status: "active";
}


/**
 *  Verifies the Stripe webhook signature.
 * 
 * 
 * @param body 
 * @param signature 
 * @returns 
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

export const calculateEndDate = (priceId: string): Date => {
  const endDate = new Date();
  switch (priceId) {
    case PRICE_IDS.YEARLY:
      endDate.setFullYear(endDate.getFullYear() + 1);
      break;
    case PRICE_IDS.MONTHLY:
      endDate.setMonth(endDate.getMonth() + 1);
      break;
    default:
      throw new Error(`Invalid price ID: ${priceId}`);
  }
  return endDate;
};


/**
 * 
 * Calculates the subscription data based on the price ID.
 * 
 * @param priceId 
 * @returns 
 */
export const getSubscriptionData = (priceId: string): SubscriptionData => {
  const endDate = calculateEndDate(priceId);
  const period = priceId === PRICE_IDS.YEARLY ? "yearly" : "monthly";

  return {
    plan: "premium",
    period,
    start_date: new Date(),
    end_date: endDate,
    status: "active",
  };
};


/**
 * Handles the checkout session completed event from Stripe.
 * 
 * @param event 
 */
export const handleCheckoutSessionCompleted = async (event: Stripe.Event) => {
  const session = await stripe.checkout.sessions.retrieve(
    (event.data.object as Stripe.Checkout.Session).id,
    { expand: ["line_items"] }
  );

  const customerId = session.customer as string;
  const { email } = session.customer_details ?? {};

  if (!email) throw new Error("Customer email not found in session");

  // Get or create user
  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user) {
    throw new Error("User not found");
  }

  // Update customer ID if not present
  if (!user.customer_id) {
    await prisma.user.update({
      where: { user_id: user.user_id },
      data: { customer_id: customerId },
    });
  }

  // Process line items
  const lineItems = session.line_items?.data ?? [];
  for (const item of lineItems) {
    const priceId = item.price?.id;
    const isSubscription = !!item.price?.recurring;

    if (!priceId || !isSubscription) continue;

    // Update or create subscription
    const subscriptionData = getSubscriptionData(priceId);
    await prisma.subscription.upsert({
      where: { user_id: user.user_id },
      update: subscriptionData,
      create: {
        ...subscriptionData,
        user_id: user.user_id,
      },
    });

    // Update user plan
    await prisma.user.update({
      where: { user_id: user.user_id },
      data: { plan: "premium" },
    });
  }
};
