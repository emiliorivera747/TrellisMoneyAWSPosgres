// pages/api/auth/callback.ts
import { NextResponse } from "next/server";
import { upsertUser } from "@/features/auth/utils/authCallback";
import { createClient } from "@/utils/supabase/server";

const ALLOWED_STRIPE_DOMAINS = [
  "checkout.stripe.com",
  "buy.stripe.com",
] as const;

// Safe internal paths only
const SAFE_NEXT_PATHS = /^\/(dashboard|onboarding|settings|billing|household)/;

interface CallbackState {
  next?: string;
  stripeLink?: string;
}
/**
 * Handles the OAuth callback, exchanging the code for a session, updating the database,
 * and redirecting to Stripe or the next URL.
 */
export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");
  const stateParam = searchParams.get("state");

  let intendedRedirect: string = "/dashboard";
  let stripePaymentLink: string | null = null;

  if (stateParam) {
    try {
      const decoded = JSON.parse(
        Buffer.from(stateParam, "base64url").toString("utf-8")
      ) as CallbackState;

      // Validate next path is internal and safe
      if (decoded.next && SAFE_NEXT_PATHS.test(decoded.next))
        intendedRedirect = decoded.next;

      // Validate Stripe link domain
      if (decoded.stripeLink) {
        const url = new URL(decoded.stripeLink);
        const isValidStripe =
          ALLOWED_STRIPE_DOMAINS.includes(url.host as any) &&
          (url.pathname.startsWith("/c/") || url.pathname.startsWith("/b/"));

        if (isValidStripe) {
          stripePaymentLink = decoded.stripeLink;
        } else {
          console.warn(
            "Blocked invalid Stripe link from state:",
            decoded.stripeLink
          );
        }
      }
    } catch (err) {
      console.warn("Failed to parse OAuth state:", err);
    }
  }

  // If no code is provided, redirect to error page
  if (!code) return NextResponse.redirect(`${origin}/auth/auth-code-error`);

  const supabase = await createClient();

  // This handles code exchange + session creation automatically
  const { error } = await supabase.auth.exchangeCodeForSession(code);

  if (error) {
    console.error("Supabase code exchange failed:", error);
    return NextResponse.redirect(`${origin}/auth/auth-code-error`);
  }

  // ----- Exchange OAuth code for a session -----
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
  if (stripePaymentLink && session.user.email) {
    const finalUrl = new URL(stripePaymentLink);
    finalUrl.searchParams.set("prefilled_email", session.user.email);
    return NextResponse.redirect(finalUrl.toString());
  }
  // Final safe redirect
  const redirectUrl = new URL(intendedRedirect, origin);
  return NextResponse.redirect(redirectUrl.toString());
}
