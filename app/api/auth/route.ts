import { auth } from "firebase-admin";
import { cookies, headers } from "next/headers";
import { NextResponse } from "next/server";
import { authAdmin } from "@/lib/firebaseAdmin";

export async function GET() {
  try {
    // Get the session cookie from the browser
    const cookieStore = await cookies();
    const session = cookieStore.get("session")?.value || "";

    // Validate if the cookie exists in the request
    if (!session) {
      return NextResponse.json({ isLogged: false }, { status: 401 });
    }

    console.log("Session cookie:", session);
    // Use Firebase Admin to validate the session cookie
    const decodedClaims = await authAdmin.verifySessionCookie(session, true);
    console.log("Decoded claims:", decodedClaims);

    if (!decodedClaims) {
      return NextResponse.json({ isLogged: false }, { status: 401 });
    }

    return NextResponse.json({ isLogged: true }, { status: 200 });
  } catch (error) {
    console.error("Error in GET request:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function POST() {
  try {
    const cookieStore = await cookies();

    // Get the Authorization header
    const headersList = await headers();
    const authorization = headersList.get("Authorization");

    if (authorization?.startsWith("Bearer ")) {
      const idToken = authorization.split("Bearer ")[1];
      const decodedToken = await auth().verifyIdToken(idToken);

      if (decodedToken) {
        // Generate session cookie
        const expiresIn = 60 * 60 * 24 * 5 * 1000;
        const sessionCookie = await auth().createSessionCookie(idToken, {
          expiresIn,
        });
        const options = {
          name: "session",
          value: sessionCookie,
          maxAge: expiresIn,
          httpOnly: true,
          secure: true,
        };

        // Add the cookie to the browser
        cookieStore.set(options);
      }
    }

    return NextResponse.json({}, { status: 200 });
  } catch (error) {
    console.error("Error in POST request:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function DELETE() {
  const cookieStore = await cookies();
  const token = cookieStore.get("session")?.value || "";
  if (!token) {
    return NextResponse.json({ isLogged: false }, { status: 401 });
  }
  await invalidateLogin(token);
  return NextResponse.json({}, { status: 200 });
}

// Create a separate file for this utility function if you prefer that way
export const invalidateLogin = async (token: string) => {
  const decodedClaims = await authAdmin.verifySessionCookie(
    token,
    true
  );
  await authAdmin.revokeRefreshTokens(decodedClaims.uid);
  const cookieStore = await cookies();
  cookieStore.delete("session");
  return;
};