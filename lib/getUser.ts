import { cookies } from "next/headers";
import { authAdmin } from "@/lib/firebaseAdmin";

//Get the user from the session cookie
//if theres no session or its invalid, return null
const getUser = async ()=> {
  const cookieStore = await cookies();
  const session = cookieStore.get("session")?.value;
  if (!session) {
    return null;
  }
  const user = await authAdmin.verifySessionCookie(session, true);
  return user;
}

export default getUser