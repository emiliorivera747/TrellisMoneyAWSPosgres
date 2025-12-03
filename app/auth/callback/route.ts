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
  if (!code) return NextResponse.redirect(`${origin}/auth/auth-code-error`);

  const supabase = await createClient();

  try {
    
    // Exchange OAuth code for a session
    const { data, error } = await supabase.auth.exchangeCodeForSession(code);
    if (error || !data.session || !data.user)
      return NextResponse.redirect(`${origin}/auth/auth-code-error`);

    const user = data.user;

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
  } finally {
    await prisma.$disconnect(); // Ensure Prisma connection is closed
  }
}











// ====================== Helper Functions ============================

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
    
    /**
     * Check whether the user exist or not
     */
    const existingUser = await getUserWithId(currentUser);
    const userExist = !!existingUser;

    /**
     * Perform the upsert
     */
    const userDB = await updateOrCreateUser(currentUser);

    /**
     * If the user does not exist then we will
     * create a new house and member.
     */
    if (!userExist) await createHousehold(currentUser);

    return userDB;
  } catch (err) {
    const errorMessage =
      err instanceof Error ? err.message : "There was an error updating user";

    return null;
  }
}

const createHousehold = async (currentUser: {
  id: string;
  email?: string;
  user_metadata: { full_name?: string };
}) => {
  let houeseholdName = "",
    fullName = currentUser.user_metadata.full_name;
  let email = currentUser.email;

  /**
   * Create household name
   */
  if (fullName) houeseholdName = `${fullName}'s Household`;
  else if (email) houeseholdName = `${email}'s Household`;
  else houeseholdName = "Our Household";

  await prisma.$transaction(async (tx) => {
    const household = await tx.household.create({
      data: {
        name: houeseholdName,
      },
    });

    await tx.householdMember.create({
      data: {
        name: fullName ?? "Unknown",
        role: "ADMIN",
        user_id: currentUser?.id,
        household_id: household.household_id,
      },
    });
  });
};

const getUserWithId = async (currentUser: {
  id: string;
  email?: string;
  user_metadata: { full_name?: string };
}) => {
  const existingUser = await prisma.user.findUnique({
    where: {
      user_id: currentUser.id,
    },
    select: { user_id: true },
  });
  return existingUser;
};

const updateOrCreateUser = async (currentUser: {
  id: string;
  email?: string;
  user_metadata: { full_name?: string };
}) => {
  const userDB = await prisma.user.upsert({
    where: { user_id: currentUser.id },
    update: {
      email: currentUser.email ?? "",
      name: currentUser.user_metadata.full_name?.trim() || "Unknown",
    },
    create: {
      user_id: currentUser.id,
      email: currentUser.email ?? "",
      name: currentUser.user_metadata.full_name?.trim() || "Unknown",
    },
  });

  return userDB;
};
