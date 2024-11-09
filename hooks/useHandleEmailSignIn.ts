"use client";

import { useRouter } from "next/navigation";
import { auth } from "@/lib/firebaseConfig";
import { signInWithEmailAndPassword } from "firebase/auth";
import { getFirebaseErrorMessage } from "@/functions/firebaseErrorMessages";
import { toast } from "react-toastify";

export const useHandleEmailSignIn = () => {
  const router = useRouter();

  const handleEmailSignIn = async (data: { email: string; password: string }) => {
    try {
      await signInWithEmailAndPassword(auth, data.email, data.password);
      toast.success("Signed in successfully!", { theme: "colored" });
      router.push("/dashboard");  // Adjust the path to your app's desired redirect location
    } catch (err: any) {
      const errorMessage = getFirebaseErrorMessage(err);
      toast.error(errorMessage);
      return errorMessage;
    }
  };

  return handleEmailSignIn;
};
