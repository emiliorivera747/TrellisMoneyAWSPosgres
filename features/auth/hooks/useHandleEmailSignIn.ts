"use client";
import { auth } from "@/config/firebaseConfig";
import {
  signInWithEmailAndPassword,
  sendEmailVerification,
} from "firebase/auth";
import { getFirebaseErrorMessage } from "@/utils/getSupabaseErrorMessages";
import { toast } from "react-toastify";

export const useHandleEmailSignIn = () => {

  const handleEmailSignIn = async (data: {
    email: string;
    password: string;
  }) => {
    try {
      const userCred = await signInWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );
      toast.success("Signed in successfully!", { theme: "colored" });
      if (userCred) {
        if (auth.currentUser) {
          await sendEmailVerification(auth.currentUser, {
            url: 'http://localhost:3000/verify-email', // Replace with your verification page URL
          });
      
        }
        return { user: userCred, success: true };
      }
      if (!userCred) return { error: "Unkown Error", success: false };
    } catch (err: unknown) {
      const errorMessage = getFirebaseErrorMessage(err);
      return { error: errorMessage, success: false };
    }
  };

  return handleEmailSignIn;
};
