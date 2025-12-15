import { createServerClient } from "@supabase/ssr";
import { NextRequest, NextResponse } from "next/server";
import getSubscriptionMinimalData from "@/utils/api-helpers/prisma/stripe/getSubscriptionMinimalData";
import { PROTECTED_PATHS } from "@/proxy";

/**
 * Updates the session for a given request by interacting with the Supabase client.
 * This function ensures that user authentication and session management are handled
 * properly, including redirecting unauthenticated users from protected paths.
 *
 * @param request - The incoming `NextRequest` object containing details about the HTTP request.
 *
 * @returns A `NextResponse` object that may include updated cookies or a redirect response.
 *
 * ### Notes:
 * - The `createServerClient` function is used to initialize the Supabase client with
 *   the necessary environment variables and cookie handling.
 * - Avoid placing any logic between the `createServerClient` initialization and the
 *   `supabase.auth.getUser()` call to prevent debugging issues related to user sessions.
 * - If the user is not authenticated and attempts to access a protected path, they are
 *   redirected to the `/sign-in` page.
 * - When returning the `supabaseResponse`, ensure that cookies are properly copied to
 *   maintain synchronization between the browser and server. Failure to do so may result
 *   in premature session termination.
 *
 * ### Example:
 * ```typescript
 * import { updateSession } from './middleware';
 *
 * export async function middleware(request: NextRequest) {
 *   return await updateSession(request);
 * }
 * ```
 */
export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({
    request,
  });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          );
        },
      },
    }
  );

  // IMPORTANT: Avoid writing any logic between createServerClient and
  // supabase.auth.getUser(). A simple mistake could make it very hard to debug
  // issues with users being randomly logged out.

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const pathname = request.nextUrl.pathname;

  if (isProtectedPath(pathname)) {
    // ----- If user is not logged in the redirect to sign up -----
    if (!user) return NextResponse.redirect(new URL("/sign-up", request.url));

    // ---- Get subscription -----
    const subscription = await getSubscriptionMinimalData(user.id);

    // ----- Convert miliseconds to seconds -----
    const now = Math.floor(Date.now() / 1000);

    const hasAccess =
      subscription &&
      (subscription.status === "active" || subscription.status === "trialing");

    if (!hasAccess)
      return NextResponse.redirect(new URL("/subscriptions", request.url));
  }

  // IMPORTANT: You *must* return the supabaseResponse object as it is. If you're
  // creating a new response object with NextResponse.next() make sure to:
  // 1. Pass the request in it, like so:
  //    const myNewResponse = NextResponse.next({ request })
  // 2. Copy over the cookies, like so:
  //    myNewResponse.cookies.setAll(supabaseResponse.cookies.getAll())
  // 3. Change the myNewResponse object to fit your needs, but avoid changing
  //    the cookies!
  // 4. Finally:
  //    return myNewResponse
  // If this is not done, you may be causing the browser and server to go out
  // of sync and terminate the user's session prematurely!

  return supabaseResponse;
}

const isProtectedPath = (pathname: string) => {
  return PROTECTED_PATHS.some((path) => pathname.startsWith(path));
};
