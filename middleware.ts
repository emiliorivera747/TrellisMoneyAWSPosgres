import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
const sign_up =`${process.env.NEXT_PUBLIC_DOMAIN}/sign-up`;
const sign_in =`${process.env.NEXT_PUBLIC_DOMAIN}/sign-in`;

export async function middleware(request: NextRequest) {

  //Get the session cookie
  const session = request.cookies.get("session");

  //Return to / if don't have a session
  if (!session) {
    console.log("NO SESSION");
    return NextResponse.redirect(new URL("/", request.url));
  }

  if (session) {
    //Call the authentication endpoint
    const responseAPI = await fetch(`${request.nextUrl.origin}/api/auth`, {
      headers: {
        Cookie: `session=${session?.value}`,
      },
    });
    
    //Return to / if token is not authorized and destroy the session
    if (responseAPI.status !== 200) {
      const response = NextResponse.redirect(new URL("/", request.url));
      response.cookies.delete("session");
      return response;
    }
  }

  return NextResponse.next();
}

// Apply middleware to specific routes
export const config = {
  matcher: [
  ],
};
