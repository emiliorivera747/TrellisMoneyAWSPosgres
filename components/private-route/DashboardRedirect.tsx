
"use client";
import { useAuth } from "@/app/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const PrivateRoute = ({ children }: ProtectedRouteProps) => {
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (user) {
      return router.push("/dashboard"); // Redirect to dashboard if authenticated
    }
  }, [user, router]);

  if (!user) {
    return <>{children}</>; // Render children if user is not authenticated
  }

  return null;
};

export default PrivateRoute;
