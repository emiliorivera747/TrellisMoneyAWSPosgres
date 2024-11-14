import { auth } from "@/config/firebaseConfig";
import { signOut } from "firebase/auth";

export const useHandleSignOut = () => {
  const handleSignOut = async () => {
    try {
      await signOut(auth);
      return { success: true };
    } catch (err: unknown) {
      return { error: "Unknown Error", success: false };
    }
  };

  return handleSignOut;
};