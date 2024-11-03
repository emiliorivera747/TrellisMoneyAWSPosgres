export {default} from "next-auth/middleware";

export const config = {
  matcher: [
    "/dashboard/:page*",
    "/investments/:page*",
    "/investment-goals/:page*",
    "/profile/:page*",
    "/settings/:page*",
    "/accounts/:page*",
    '/api/:path*',
  ],
};
