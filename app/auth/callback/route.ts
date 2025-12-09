// pages/api/auth/callback.ts
import { NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";
import { upsertUser } from "@/features/auth/utils/authCallback";
import createCheckoutSession from "@/utils/api-helpers/stripe/createCheckoutSession";
import { getPriceIdBySlug } from "@/lib/plan-cache";

/**
 * Handles the OAuth callback, exchanging the code for a session, updating the database,
 * and redirecting to Stripe or the next URL.
 */
export async function GET(request: Request) {
  
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");
  const plan = searchParams.get("plan");
  const next = searchParams.get("next") ?? "/dashboard";

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

  const currentUser = data.session.user;
  console.log(currentUser);

  // ---- Upsert User ----
  await upsertUser(currentUser).catch((error) =>
    console.error("Error upserting user:", error)
  );

  if (plan && currentUser.email) {
    try {
      const price_id = await getPriceIdBySlug(plan);

      if (!price_id) {
        console.error("Price id was not found", price_id);
        return NextResponse.redirect(`${origin}/auth/auth-code-error`);
      }

      const success_url = next?.startsWith("http") ? next : `${origin}${next}`;
      const cancel_url = `${origin}/billing`;

      const checkoutUrl = await createCheckoutSession({
        customer_email: currentUser.email,
        price_id,
        success_url,
        cancel_url,
      });

      if (!checkoutUrl) {
        console.error("Checkout URL is null");
        return NextResponse.redirect(`${origin}/auth/auth-code-error`);
      }

      return NextResponse.json(checkoutUrl);
    } catch (error) {
      console.error("Error creating checkout session:", error);
      return NextResponse.redirect(`${origin}/auth/auth-code-error`);
    }
  }

  // Redirect to the dashboard
  const redirectTo = next?.startsWith("http") ? next : `${origin}${next}`;

  return NextResponse.redirect(redirectTo);
}
