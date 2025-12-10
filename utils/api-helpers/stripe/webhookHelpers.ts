import { stripe } from "@/lib/stripe";
import Stripe from "stripe";
const WEBHOOK_SECRET = process.env.STRIPE_WEBHOOK_SECRET as string;

/**
 *  Verifies the Stripe webhook signature.
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

// export const calculateEndDate = (priceId: string): Date => {
//   const endDate = new Date();
//   switch (priceId) {
//     case PRICE_IDS.YEARLY:
//       endDate.setFullYear(endDate.getFullYear() + 1);
//       break;
//     case PRICE_IDS.MONTHLY:
//       endDate.setMonth(endDate.getMonth() + 1);
//       break;
//     default:
//       throw new Error(`Invalid price ID: ${priceId}`);
//   }
//   return endDate;
// };
