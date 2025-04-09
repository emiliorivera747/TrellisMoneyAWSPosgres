// pages/api/auth/callback.ts
import { NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");
  const next = searchParams.get("next") ?? "/dashboard";
  const stripePaymentLink = searchParams.get("stripePaymentLink"); // Get from query params

  if (code) {
    const supabase = await createClient();
    const { data, error } = await supabase.auth.exchangeCodeForSession(code);
    if (error) return NextResponse.redirect(`${origin}/auth/auth-code-error`);
    
    // Get the authenticated user
    const user = data.user;

    if (user) {
      // Add or update user in PostgreSQL via Prisma
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
        console.error("Error adding user to database:", dbError);
      }
    }

    // Handle redirect (Stripe or next)
    const forwardedHost = request.headers.get("x-forwarded-host");
    const isLocalEnv = process.env.NODE_ENV === "development";
    let redirectBase = isLocalEnv
      ? origin
      : forwardedHost
      ? `https://${forwardedHost}`
      : origin;

    if (stripePaymentLink && user?.email) {
      const redirectUrl = `${stripePaymentLink}?prefilled_email=${encodeURIComponent(user.email)}`;
      return NextResponse.redirect(redirectUrl);
    } else {
      return NextResponse.redirect(`${redirectBase}${next}`);
    }
  }

  // Return to an error page if no code or other issues
  return NextResponse.redirect(`${origin}/auth/auth-code-error`);
}