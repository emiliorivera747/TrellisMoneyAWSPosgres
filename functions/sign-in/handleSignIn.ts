"use client";
//Functions
import { getFirebaseErrorMessage } from "@/functions/firebaseErrorMessages";
import { toast } from "react-toastify";

// Firebase
import { auth, googleProvider } from "@/lib/firebaseConfig";
import { signInWithPopup } from "firebase/auth";
import { signInWithEmailAndPassword } from "firebase/auth";

export const handleEmailSignIn = async (
  data: { email: string; password: string },
  router: any
) => {
  try {
    await signInWithEmailAndPassword(auth, data.email, data.password);
    toast.success("Signed in successfully!", { theme: "colored" });
    router.push("/dashboard");
  } catch (err: any) {
    return getFirebaseErrorMessage(err);
  }
};

export const handleGoogleSignIn = async (router: any) => {
  try {
    await signInWithPopup(auth, googleProvider);
    toast.success("Signed in successfully!", { theme: "colored" });
    router.push("/dashboard");
  } catch (err: any) {
    const errorMessage = err.message;
    toast.error(errorMessage);
    return errorMessage;
  }
}
