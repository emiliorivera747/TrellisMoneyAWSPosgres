// pages/api/auth/callback.ts
import { NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";
import {
  getRedirectBase,
  upsertUser,
} from "@/features/auth/utils/authCallback";

/**
 * Handles the OAuth callback, exchanging the code for a session, updating the database,
 * and redirecting to Stripe or the next URL.
 */
export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");
  const next = searchParams.get("next") ?? "/dashboard";
  const stripePaymentLink = searchParams.get("stripePaymentLink");

  // If no code is provided, redirect to error page
  if (!code) return NextResponse.redirect(`${origin}/auth/auth-code-error`);

  const supabase = await createClient();

  try {
    // ----- Exchange OAuth code for a session -----
    const {
      data: { session, user },
      error,
    } = await supabase.auth.exchangeCodeForSession(code);
    if (error || !session || !user)
      return NextResponse.redirect(`${origin}/auth/auth-code-error`);

    // ----- Always keep user in sync with DB -----
    const userDB = await upsertUser(user);

    if (!userDB) return NextResponse.redirect(`${origin}/auth/auth-code-error`);

    if (stripePaymentLink && user?.email) {
      const redirectUrl = `${stripePaymentLink}?prefilled_email=${encodeURIComponent(
        user.email
      )}`;
      return NextResponse.redirect(redirectUrl);
    }

    // ----- Redirect URL -----
    const redirectBase = getRedirectBase(request, origin);
    return NextResponse.redirect(`${redirectBase}${next}`);
  } catch (error) {
    return NextResponse.redirect(`${origin}/auth/auth-code-error`);
  }
}
