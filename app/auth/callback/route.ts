// pages/api/auth/callback.ts
import { NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";
import { getPriceIdBySlug } from "@/lib/plan-cache";

// Utils
import createCheckoutSession from "@/utils/api-helpers/stripe/createCheckoutSession";

/**
 * Handles the OAuth callback, exchanging the code for a session, updating the database,
 * and redirecting to Stripe or the next URL.
 */
export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");
  const plan = searchParams.get("plan");

  // -----If no code is provided, redirect to error page -----
  if (!code) return NextResponse.redirect(`${origin}/auth/auth-code-error`);

  const supabase = await createClient();

  // ----- Exchange OAuth code for a session -----
  const { data, error: exchangeTokenError } =
    await supabase.auth.exchangeCodeForSession(code);

  if (exchangeTokenError || !data?.session?.user) {
    console.error("Supabase code exchange failed:", exchangeTokenError);
    return NextResponse.redirect(`${origin}/auth/auth-code-error`);
  }

  // ----- Get Email -----
  const customer_email = data?.session?.user?.email;

  // ----- Redirect to Stripe with prefilled email (if valid) -----
  if (plan && customer_email) {

    await supabase.auth.signOut();

    const price_id = await getPriceIdBySlug(plan);

    if (!price_id) {
      console.error("Price ID is null");
      return NextResponse.redirect(`${origin}/auth/auth-code-error`);
    }

    try {
      
      const checkoutUrl = await createCheckoutSession({
        customer_email,
        price_id,
        success_url: `${origin}/api/auth/success?code=${code}`,
        cancel_url: `${origin}/dashboard`,
      });

      if (!checkoutUrl) {
        console.error("Checkout URL is null");
        return NextResponse.redirect(`${origin}/auth/auth-code-error`);
      }

      return NextResponse.redirect(checkoutUrl);
    } catch (error) {
      console.error("Failed to create Stripe checkout session:", error);
    }
  }

  return NextResponse.redirect(`${origin}/auth/auth-code-error`);
}
