import { authAdmin } from "@/config/firebaseAdmin";
import { cookies } from "next/headers";

// Create a separate file for this utility function if you prefer that way
export const invalidateLogin = async (token: string) => {
  const decodedClaims = await authAdmin.verifySessionCookie(token, true);
  await authAdmin.revokeRefreshTokens(decodedClaims.uid);
  const cookieStore = await cookies();
  cookieStore.delete("session");
  return;
};
