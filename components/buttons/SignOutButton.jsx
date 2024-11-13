// app/components/SignOutButton.tsx
"use client";
const API_URL = `${process.env.NEXT_PUBLIC_DOMAIN}/auth`;

import { useState } from "react";
import { auth } from "@/lib/firebaseConfig";
import { signOut } from "firebase/auth";
import { useRouter } from "next/navigation";

import authService from "@/lib/features/auth/authService";

export default function SignOutButton() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSignOut = async () => {
    setIsLoading(true);
    try {
      await signOut(auth); // Sign out from Firebase
      const res = await authService.invalidateLogin();
      console.log(res);
      document.cookie = "session=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT;";
      router.push("/"); // Redirect to the home page or login page
    } catch (error) {
      console.error("Error signing out:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button onClick={handleSignOut} disabled={isLoading} className="signout-button">
      {isLoading ? "Signing out..." : "Sign Out"}
    </button>
  );
}
