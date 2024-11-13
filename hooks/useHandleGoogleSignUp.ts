"use client";
import { auth, googleProvider } from "@/lib/firebaseConfig";
import { signInWithPopup } from "firebase/auth";
import { toast } from "react-toastify";
import { getFirebaseErrorMessage } from "@/functions/firebaseErrorMessages";

export const useHandleGoogleSignUp = () => {
  const handleGoogleSignUp = async () => {
    try {
      const user = await signInWithPopup(auth, googleProvider);
      toast.success("Signed up successfully!", { theme: "colored" });
      if (user) return {user, success: true};
      if (!user) return {error:"Unkown Error", success: false};
    } catch (err: unknown) {
      const errorMessage = getFirebaseErrorMessage(err);
      return { error: errorMessage, success: false };
    }
  };

  return handleGoogleSignUp;
};
