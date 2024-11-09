'use client';
//Functions
import { getFirebaseErrorMessage } from "@/functions/firebaseErrorMessages";
import { toast } from "react-toastify";

// Firebase
import { auth, googleProvider } from "@/lib/firebaseConfig";
import { createUserWithEmailAndPassword, signInWithPopup } from "firebase/auth";

export const handleEmailSignUp = async (
  data: { email: string; password: string },
  router: any
) => {
  try {
    await createUserWithEmailAndPassword(auth, data.email, data.password);
    toast.success("Signed up successfully!", { theme: "colored" });
    router.push("/");
  } catch (err: any) {
    return getFirebaseErrorMessage(err);
  }
};

export const handleGoogleSignUp = async (router: any) => {
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
