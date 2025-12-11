import { NextResponse } from "next/server";

import { stripe } from "@/lib/stripe";

/**
 * Handles the GET request to retrieve a list of active Stripe prices.
 *
 * This function interacts with the Stripe API to fetch a list of active prices,
 * including their associated product details. The results are returned as a JSON
 * response with a status of 200 on success. If an error occurs during the process,
 * an appropriate error response is returned.
 *
 * @returns {Promise<Response>} A JSON response containing the list of active prices
 * and their associated product details, or an error message with the corresponding
 * HTTP status code.
 *
 * @throws {Error} If an error occurs while fetching the prices from the Stripe API,
 * the error message and status code are returned in the response.
 */
export async function GET() {
  try {
    /**
     * Get all of the prices
     */
    const prices = await stripe.prices.list({
      active: true,
      limit: 100,
      expand: ["data.product"],
    });

    return NextResponse.json(
      { data: prices.data, status: "success" },
      { status: 200 }
    );
  } catch (error: any) {
    return new Response(error.message, { status: error.statusCode || 500 });
  }
}
