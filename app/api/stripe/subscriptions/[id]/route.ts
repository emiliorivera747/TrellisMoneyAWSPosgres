import { NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";

/**
 * Handles the GET request to retrieve a specific Stripe price by its ID.
 *
 * This function interacts with the Stripe API to fetch the price details
 * for the given ID. The result is returned as a JSON response with a status
 * of 200 on success. If an error occurs during the process, an appropriate
 * error response is returned.
 *
 * @param {Object} params - The route parameters, including the price ID.
 * @returns {Promise<Response>} A JSON response containing the price details
 * or an error message with the corresponding HTTP status code.
 *
 * @throws {Error} If an error occurs while fetching the price from the Stripe API,
 * the error message and status code are returned in the response.
 */
export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  try {
    /**
     * Get the price by ID
     */
    const price = await stripe.subscriptions.retrieve(id);

    return NextResponse.json(
      { data: price, status: "success" },
      { status: 200 }
    );
  } catch (error: any) {
    return new Response(error.message, { status: error.statusCode || 500 });
  }
}
