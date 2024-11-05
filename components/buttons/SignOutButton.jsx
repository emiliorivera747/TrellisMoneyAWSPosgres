// app/components/SignOutButton.tsx
"use client";

import { useState } from "react";
import { auth } from "@/lib/firebaseConfig";
import { signOut } from "firebase/auth";
import { useRouter } from "next/navigation";

export default function SignOutButton() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSignOut = async () => {
    setIsLoading(true);
    try {
      await signOut(auth); // Sign out from Firebase
      document.cookie = "authToken=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;"; // Clear auth token cookie
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
