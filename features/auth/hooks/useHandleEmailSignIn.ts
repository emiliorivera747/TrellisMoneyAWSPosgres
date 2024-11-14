"use client";
import { auth } from "@/config/firebaseConfig";
import { signInWithEmailAndPassword } from "firebase/auth";
import { getFirebaseErrorMessage } from "@/utils/firebaseErrorMessages";
import { toast } from "react-toastify";

export const useHandleEmailSignIn = () => {

  const handleEmailSignIn = async (data: { email: string; password: string }) => {
    try {
      const user = await signInWithEmailAndPassword(auth, data.email, data.password);
      toast.success("Signed in successfully!", { theme: "colored" });
      if (user) return {user, success: true};
      if (!user) return {error:"Unkown Error", success: false};
    } catch (err: unknown) {
      const errorMessage = getFirebaseErrorMessage(err);
      return { error: errorMessage, success: false };
    }
  };

  return handleEmailSignIn;
};
