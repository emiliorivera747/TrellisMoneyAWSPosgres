import { type NextRequest } from "next/server";
import { updateSession } from "@/utils/supabase/middleware";
export const PROTECTED_PATHS = [
  "/dashboard",
  "/settings",
  "/profile",
  "/account",
  "/accounts",
  "/investments",
  "/investment-goals",
  "/api/plaid/:path*",
  "/api/stripe/:path*",
  "/plaid-connections",
];

export async function proxy(request: NextRequest) {
  return await updateSession(request);
}

export const config = {
  matcher: [
    "/dashboard",
    "/settings",
    "/profile",
    "/account/:path*",
    "/accounts/:path*",
    "/investments",
    "/investment-goals",
    "/api/plaid/:path*",
    "/api/stripe/:path*",
    "/plaid-connections",
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * Feel free to modify this pattern to include more paths.
     */
    "/((?!_next/static|_next/image|favicon.ico|api|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
