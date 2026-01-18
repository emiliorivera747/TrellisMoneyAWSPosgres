import { NextResponse, NextRequest } from "next/server";
import { ErrorResponse } from "@/utils/api-helpers/api-responses/response";
import { withAuth } from "@/lib/protected";

// import getSubscriptionMinimalData from "@/utils/prisma/stripe/getSubscriptionMinimalData";
import { hasActiveSubscription } from "@/utils/api-helpers/stripe/subscriptions";
import getSubscriptionMinimalData from "@/utils/drizzle/stripe/getSubscriptionWithMinimalData";

/**
 * Handles the GET request to check if a user has an active subscription.
 *
 * @param req - The incoming Next.js request object.
 * @returns A JSON response indicating the subscription status and a success message,
 *          or an error response in case of failure.
 */
export const GET = async (req: NextRequest) => {
  return withAuth(req, async (request, user) => {
    try {
      const subscription = await getSubscriptionMinimalData(user.id);
      console.log("subscription", subscription);
      const subscribed = hasActiveSubscription(subscription);
      return NextResponse.json(
        { subscribed, status: "success" },
        { status: 200 }
      );
    } catch (error) {
      return ErrorResponse(error);
    }
  });
};
