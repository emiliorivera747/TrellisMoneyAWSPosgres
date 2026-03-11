import { NextResponse, NextRequest } from "next/server";
import { stripe } from "@/lib/stripe";
import { withAuth } from "@/lib/protected";

export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  return withAuth(req, async () => {
    const { id } = await params;

    try {
      const price = await stripe.prices.retrieve(id, {
        expand: ["product"],
      });

      return NextResponse.json(
        { data: price, status: "success" },
        { status: 200 }
      );
    } catch {
      return NextResponse.json({ message: "Server Error" }, { status: 500 });
    }
  });
}