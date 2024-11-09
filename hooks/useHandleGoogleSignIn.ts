"use client";

import { useRouter } from "next/navigation";
import { auth, googleProvider } from "@/lib/firebaseConfig";
import { signInWithPopup } from "firebase/auth";
import { toast } from "react-toastify";

export const useHandleGoogleSignIn = () => {
  const router = useRouter();

  const handleGoogleSignIn = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      toast.success("Signed in successfully!", { theme: "colored" });
      router.push("/dashboard");  // Adjust the path to your app's desired redirect location
    } catch (err: any) {
      const errorMessage = err.message;
      toast.error(errorMessage);
      return errorMessage;
    }
  };

  return handleGoogleSignIn;
};
