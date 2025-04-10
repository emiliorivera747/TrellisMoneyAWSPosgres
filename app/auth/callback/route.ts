// pages/api/auth/callback.ts
import { NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

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
async function upsertUser(user: {
  id: string;
  email?: string;
  user_metadata: { full_name?: string };
}) {
  try {
    await prisma.user.upsert({
      where: { user_id: user.id },
      update: {
        email: user.email,
        name: user.user_metadata.full_name || "Unknown",
      },
      create: {
        user_id: user.id,
        email: user.email ?? "",
        name: user.user_metadata.full_name || "Unknown",
      },
    });
  } catch (dbError) {
    console.error("Failed to upsert user in database:", dbError);
  }
}

/**
 *  Checks whether the user already exists in the database.
 */
async function getUser(userId: string): Promise<boolean> {
  const user = await prisma.user.findUnique({
    where: { user_id: userId },
  });
  return user;
}

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
    // Exchange OAuth code for a session
    const { data, error } = await supabase.auth.exchangeCodeForSession(code);
    if (error) return NextResponse.redirect(`${origin}/auth/auth-code-error`);

    const user = data.user;

    // Check if user exists in the database
    const userDB = await getUser(user.id);
    const exists = !!userDB;

    // If user data is available, update the database
    if (user && !exists) {
      await upsertUser(user);
    } else {
      console.warn("No user data returned from session");
    }

    // Determine redirect URL
    const redirectBase = getRedirectBase(request, origin);

    if (stripePaymentLink && user?.email && !exists) {
      const redirectUrl = `${stripePaymentLink}?prefilled_email=${encodeURIComponent(
        user.email
      )}`;
      return NextResponse.redirect(redirectUrl);
    }
    return NextResponse.redirect(`${redirectBase}${next}`);
  } catch (error) {
    return NextResponse.redirect(`${origin}/auth/auth-code-error`);
  } finally {
    await prisma.$disconnect(); // Ensure Prisma connection is closed
  }
}
