"use client";

import { useRouter } from "next/navigation";
import { auth, googleProvider } from "@/lib/firebaseConfig";
import { signInWithPopup } from "firebase/auth";
import { toast } from "react-toastify";

export const useHandleGoogleSignUp = () => {
  const router = useRouter();
  const handleGoogleSignUp = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      toast.success("Signed up successfully!", { theme: "colored" });
      router.push("/dashboard");
    } catch (err: any) {
      const errorMessage = err.message;
      toast.error(errorMessage);
      return errorMessage;
    }
  };

  return handleGoogleSignUp;
};
