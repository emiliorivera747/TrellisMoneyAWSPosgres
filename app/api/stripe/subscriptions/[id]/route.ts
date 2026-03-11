import { NextResponse, NextRequest } from "next/server";
import { stripe } from "@/lib/stripe";
import { withAuth } from "@/lib/protected";

/**
 * Handles the GET request to retrieve a specific Stripe subscription by its ID.
 *
 * This function interacts with the Stripe API to fetch the subscription details
 * for the given ID. The result is returned as a JSON response with a status
 * of 200 on success. If an error occurs during the process, an appropriate
 * error response is returned.
 *
 * @param {Object} params - The route parameters, including the subscription ID.
 * @returns {Promise<Response>} A JSON response containing the subscription details
 * or an error message with the corresponding HTTP status code.
 *
 * @throws {Error} If an error occurs while fetching the subscription from the Stripe API,
 * the error message and status code are returned in the response.
 */
export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  return withAuth(req, async () => {
    const { id } = await params;

    try {
      /**
       * Get the subscription by ID
       */
      const subscription = await stripe.subscriptions.retrieve(id);

      return NextResponse.json(
        { data: subscription, status: "success" },
        { status: 200 }
      );
    } catch {
      return NextResponse.json({ message: "Server Error" }, { status: 500 });
    }
  });
}
