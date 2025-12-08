// pages/api/auth/callback.ts
import { NextResponse } from "next/server";
import { upsertUser } from "@/features/auth/utils/authCallback";
import { createClient } from "@/utils/supabase/server";

import { getPriceIdBySlug } from "@/lib/plan-cache";

// Stripe
import { stripe } from "@/lib/stripe";

/**
 * Handles the OAuth callback, exchanging the code for a session, updating the database,
 * and redirecting to Stripe or the next URL.
 */
export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");
  const plan = searchParams.get("plan");

  let intendedRedirect: string = "/dashboard";

  // -----If no code is provided, redirect to error page -----
  if (!code) return NextResponse.redirect(`${origin}/auth/auth-code-error`);

  const supabase = await createClient();

  // ----- Exchange OAuth code for a session -----
  const { error: exchangeTokenError } =
    await supabase.auth.exchangeCodeForSession(code);
  if (exchangeTokenError) {
    console.error("Supabase code exchange failed:", exchangeTokenError);
    return NextResponse.redirect(`${origin}/auth/auth-code-error`);
  }

  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session?.user)
    return NextResponse.redirect(`${origin}/auth/auth-code-error`);

  // ----- Sync user to DB (soft fail — don't block login) -----
  try {
    await upsertUser(session.user);
  } catch (err) {
    console.error("Failed to sync user to DB after login:", err);
  }

  // Redirect to Stripe with prefilled email (if valid)
  if (plan && session.user.email) {
    const price_id = await getPriceIdBySlug(plan);
    if (!price_id) {
      console.error("Price ID is null");
      return NextResponse.redirect(`${origin}/auth/auth-code-error`);
    }
    try {
      const checkoutUrl = await createCheckoutSession(
        session.user.email,
        price_id
      );

      if (!checkoutUrl) {
        console.error("Checkout URL is null");
        return NextResponse.redirect(`${origin}/auth/auth-code-error`);
      }

      return NextResponse.redirect(checkoutUrl);
    } catch (error) {
      console.error("Failed to create Stripe checkout session:", error);
    }
  }
  // Final safe redirect
  const redirectUrl = new URL(intendedRedirect, origin);
  return NextResponse.redirect(redirectUrl.toString());
}

// Helper to create a Stripe Checkout session
async function createCheckoutSession(userEmail: string, priceId: string) {
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    customer_email: userEmail,
    mode: "subscription",
    line_items: [{ price: priceId, quantity: 1 }],
    success_url: `${process.env.NEXT_PUBLIC_DOMAIN}/dashboard?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${process.env.NEXT_PUBLIC_DOMAIN}/billing`,
  });
  return session.url;
}
