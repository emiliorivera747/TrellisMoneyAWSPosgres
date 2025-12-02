// pages/api/auth/callback.ts
import { NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

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
  if (!code) {
    console.warn("No code in callback url");
    return NextResponse.redirect(`${origin}/auth/auth-code-error`);
  }

  const supabase = await createClient();

  try {
    // Exchange OAuth code for a session
    const { data, error } = await supabase.auth.exchangeCodeForSession(code);
    if (error || !data.session || !data.user) {
      console.error("Supabse code exchange failed:", error);
      return NextResponse.redirect(`${origin}/auth/auth-code-error`);
    }

    const user = data.user;

    // ----- Always keep user in sync with DB -----
    const res = await upsertUser(user);

    if (!res) return NextResponse.redirect(`${origin}/auth/auth-code-error`);

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
  } finally {
    await prisma.$disconnect(); // Ensure Prisma connection is closed
  }
}

/**
 * Determines the base redirect URL based on environment and headers.
 */
function getRedirectBase(request: Request, origin: string): string {
  const forwardedHost = request.headers.get("x-forwarded-host");
  const isLocalEnv = process.env.NODE_ENV === "development";
  if (isLocalEnv) return origin;
  if (forwardedHost) return `https://${forwardedHost}`;
  return origin;
}

/**
 * Adds or updates a user in the PostgreSQL database via Prisma.
 */
async function upsertUser(currentUser: {
  id: string;
  email?: string;
  user_metadata: { full_name?: string };
}) {
  try {
    const res = await prisma.user.upsert({
      where: { user_id: currentUser.id },
      update: {
        email: currentUser.email,
        name: currentUser.user_metadata.full_name?.trim() || "Unknown",
      },
      create: {
        user_id: currentUser.id,
        email: currentUser.email,
        name: currentUser.user_metadata.full_name?.trim() || "Unknown",
      },
    });
    return res;
  } catch (err) {
    const errorMessage =
      err instanceof Error ? err.message : "There was an error updating user";
    console.log("Error Message", errorMessage);
    console.error("Failed to upsert user in database:", errorMessage);
    return null;
  }
}
