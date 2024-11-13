import { cookies } from "next/headers";
import { authAdmin } from "@/lib/firebaseAdmin"; // Adjust the import path based on your project structure

export async function validateSession() {
  try {
    const cookieStore = await cookies();
    const session = cookieStore.get("session")?.value || "";
    if (!session) {
      return { isValid: false, status: 401 };
    }
    const decodedClaims = await authAdmin.verifySessionCookie(session, true);
    if (!decodedClaims) {
      return { isValid: false, status: 401 };
    }
    return { isValid: true, decodedClaims};
  } catch (error: unknown) {
    return { isValid: false, status: 500, error: error };
  }
}
