import { prisma } from "@/lib/prisma";
import { stripe } from "@/lib/stripe";
import Stripe from "stripe";
import { NextRequest } from "next/server"; // Assuming Next.js 13+ App Router

// Constants
const WEBHOOK_SECRET = process.env.STRIPE_WEBHOOK_SECRET as string;
const PRICE_IDS = {
  YEARLY: process.env.STRIPE_YEARLY_SUBSCRIPTION_PRICE_ID as string,
  MONTHLY: process.env.STRIPE_MONTHLY_SUBSCRIPTION_PRICE_ID as string,
};

// Types
interface SubscriptionData {
  plan: "premium";
  period: "monthly" | "yearly";
  start_date: Date;
  end_date: Date;
  status: "active";
}

// Utility Functions
const verifyWebhookSignature = (body: string, signature: string): Stripe.Event => {
  try {
    return stripe.webhooks.constructEvent(body, signature, WEBHOOK_SECRET);
  } catch (err) {
    throw new Error(`Signature verification failed: ${(err as Error).message}`);
  }
};

const calculateEndDate = (priceId: string): Date => {
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

const getSubscriptionData = (priceId: string): SubscriptionData => {
  console.log("Price ID:", priceId);
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

// Handler Functions
const handleCheckoutSessionCompleted = async (event: Stripe.Event) => {
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

// Main Handler
export async function POST(req: NextRequest) {
  try {
    const body = await req.text();
    const signature = req.headers.get("Stripe-Signature");
    
    if (!signature) return new Response("Missing Stripe-Signature header", { status: 400 });
    
    // Verify webhook
    const event = verifyWebhookSignature(body, signature);

    // Handle events
    switch (event.type) {
      case "checkout.session.completed":
        await handleCheckoutSessionCompleted(event);
        break;
      default:
        console.log(`Unhandled event type: ${event.type}`);
    }

    return new Response("Webhook processed successfully", { status: 200 });
  } catch (error) {
    console.error("Webhook processing error:", error);
    const message = error instanceof Error ? error.message : "Unknown error";
    return new Response(`Webhook Error: ${message}`, { status: 400 });
  }
}