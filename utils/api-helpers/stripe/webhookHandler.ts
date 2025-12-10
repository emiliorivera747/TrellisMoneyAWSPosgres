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
 * Optimized to batch database operations where possible
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

  // ----- Find the user -----
  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user) throw new Error("User not found");
  
  // Process line items
  const lineItems = session.line_items?.data ?? [];
  const subscriptionItem = lineItems.find(item => {
    const priceId = item.price?.id;
    const isSubscription = !!item.price?.recurring;
    return priceId && isSubscription;
  });

  if (subscriptionItem) {
    const priceId = subscriptionItem.price?.id;
    if (!priceId) return;

    const subscriptionData = getSubscriptionData(priceId);
    
    // ----- Batch user and subscription updates in a single transaction ------
    await prisma.$transaction([
      prisma.user.update({
        where: { user_id: user.user_id },
        data: { 
          customer_id: user.customer_id ? undefined : customerId,
          plan: "premium"
        },
      }),
      
      prisma.subscription.upsert({
        where: { user_id: user.user_id },
        update: subscriptionData,
        create: {
          ...subscriptionData,
          user_id: user.user_id,
        },
      })
    ]);
  } else if (!user.customer_id) {
    // Only update customer ID if needed and no subscription was found
    await prisma.user.update({
      where: { user_id: user.user_id },
      data: { customer_id: customerId },
    });
  }
};

/**
 * Handles subscription deletion event from Stripe
 * Optimized to batch user and subscription updates in a single transaction
 * 
 * @param event
 */
export const handleSubscriptionDeleted = async (event: Stripe.Event) => {
  const subscription = await stripe.subscriptions.retrieve(
    (event.data.object as Stripe.Subscription).id
  );

  const user = await prisma.user.findUnique({
    where: { customer_id: subscription.customer as string },
  });

  if (!user) {
    throw new Error("User not found for the subscription deleted event.");
  }

  // Batch user and subscription updates in a single transaction
  await prisma.$transaction([
    prisma.user.update({
      where: { user_id: user.user_id },
      data: { plan: "free" },
    }),
    prisma.subscription.update({
      where: { user_id: user.user_id },
      data: {
        plan: "free",
        status: "inactive",
        end_date: new Date(),
      },
    })
  ]);
};
