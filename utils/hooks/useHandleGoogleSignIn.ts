"use client";
import { auth, googleProvider } from "@/config/firebaseConfig";
import { signInWithPopup } from "firebase/auth";
import { toast } from "react-toastify";
import { getFirebaseErrorMessage } from "@/utils/functions/firebaseErrorMessages";

export const useHandleGoogleSignIn = () => {

  const handleGoogleSignIn = async () => {
    try {
      const user = await signInWithPopup(auth, googleProvider);
      toast.success("Signed in successfully!", { theme: "colored" });
      if (user) return {user, success: true};
      if (!user) return {error:"Unkown Error", success: false};
    } catch (err: unknown) {
      const errorMessage = getFirebaseErrorMessage(err);
      return { error: errorMessage, success: false };
    }
  };

  return handleGoogleSignIn;
};
