import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  const session = request.cookies.get("session");

  // If the user is authenticated, do not allow access to /sign-in, /login-help, or /
  if (session && ["/sign-in", "/login-help", "/"].includes(request.nextUrl.pathname)) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  // Return to /login if don't have a session
  if (!session) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  // Call the authentication endpoint
  const responseAPI = await fetch(`${request.nextUrl.origin}/api/auth`, {
    headers: {
      Cookie: `session=${session?.value}`,
    },
  });

  // Return to /login if token is not authorized
  if (responseAPI.status !== 200) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

// Add your protected routes
export const config = {
  matcher: ["/dashboard/:path*", "/investment-goals/:path*", "/sign-in", "/login-help", "/"],
};