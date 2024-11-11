"use client";
import { auth } from "@/lib/firebaseConfig";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { getFirebaseErrorMessage } from "@/functions/firebaseErrorMessages";
import { toast } from "react-toastify";
import { hasCustomGetInitialProps } from "next/dist/build/utils";

export const useHandleEmailSignUp = () => {
  const handleEmailSignUp = async (data: {
    email: string;
    password: string;
  }) => {
    try {
      const user = await createUserWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );
      toast.success("Signed up successfully!", { theme: "colored" });
      return { user, success: true };
    } catch (err: any) {
      const errorMessage = getFirebaseErrorMessage(err);
      return { error: errorMessage, success: false };
    }
  };

  return handleEmailSignUp;
};
