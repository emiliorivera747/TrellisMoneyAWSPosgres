"use client";
import { useAuth } from "@/app/AuthContext";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const DashboardRedirect= ({ children }: ProtectedRouteProps) => {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [isUserChecked, setIsUserChecked] = useState(false);

  useEffect(() => {
    if (!loading) {
      setIsUserChecked(true);
      if (user) {
        return router.push("/dashboard"); // Redirect to dashboard if authenticated
      }
    }
  }, [ user, router]);

  if (!isUserChecked || loading) {
    return <div>Loading...</div>; // Show loading until auth status is confirmed
  }

  return children ;
};

export default DashboardRedirect;
