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
      return { user, success: true };
    } catch (err: any) {
      const errorMessage = getFirebaseErrorMessage(err);
      return { error: errorMessage, success: false };
    }
  };

  return handleGoogleSignUp;
};
