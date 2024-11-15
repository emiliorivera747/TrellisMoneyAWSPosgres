"use client";
import { auth, googleProvider } from "@/config/firebaseConfig";
import { signInWithPopup } from "firebase/auth";
import { toast } from "react-toastify";
import { getFirebaseErrorMessage } from "@/utils/firebaseErrorMessages";

export const useHandleGoogleSignIn = () => {

  const handleGoogleSignIn = async () => {
    try {
      const user = await signInWithPopup(auth, googleProvider);
      toast.success("Signed in successfully!", { theme: "colored" });
      console.log("USER", user);
      if (user) return {user: user, success: true};
      if (!user) return {error:"Unkown Error", success: false};
    } catch (err: unknown) {
      const errorMessage = getFirebaseErrorMessage(err);
      return { error: errorMessage, success: false };
    }
  };

  return handleGoogleSignIn;
};
