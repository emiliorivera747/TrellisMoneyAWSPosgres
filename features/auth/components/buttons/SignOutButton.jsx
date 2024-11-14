"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

//Custom hooks
import { useHandleSignOut } from "@/features/auth/hooks/useHandleSignOut";

//Services
import authService from "@/features/auth/services/authService";

export default function SignOutButton() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const handleUserSignOut = useHandleSignOut();

  const handleSignOut = async () => {
    setIsLoading(true);
    try {
      const firebaseResponse = await handleUserSignOut();
      console.log("firebaseResponse", firebaseResponse);

      if (firebaseResponse.success) {
        await authService.invalidateLogin();
        document.cookie = "session=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT;";
        router.push("/"); // Redirect to the home page or login page
      }

    } catch (error) {
      console.error("Error signing out:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button onClick={handleSignOut} disabled={isLoading} className="signout-button p-4 bg-zinc-300 font-bold rounded-md">
      {isLoading ? "Signing out..." : "Sign Out"}
    </button>
  );
}
