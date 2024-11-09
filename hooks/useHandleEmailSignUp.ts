"use client";

import { useRouter } from "next/navigation";
import { auth } from "@/lib/firebaseConfig";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { getFirebaseErrorMessage } from "@/functions/firebaseErrorMessages";
import { toast } from "react-toastify";

export const useHandleEmailSignUp = () => {
  const router = useRouter();

  const handleEmailSignUp = async (data: { email: string; password: string }) => {
    try {
      await createUserWithEmailAndPassword(auth, data.email, data.password);
      toast.success("Signed up successfully!", { theme: "colored" });
      router.push("/");
    } catch (err: any) {
      return getFirebaseErrorMessage(err);
    }
  };

  return handleEmailSignUp;
};
