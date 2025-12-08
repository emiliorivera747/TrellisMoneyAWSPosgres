import { NextResponse } from "next/server";

import { stripe } from "@/lib/stripe";

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
