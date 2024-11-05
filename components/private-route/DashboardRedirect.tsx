
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
      router.push("/dashboard"); // Redirect to home if not authenticated
    }
  }, [user, router]);
  
  if (user) return null; // Render nothing until redirect happens

  return <>{children}</>;
};

export default PrivateRoute;
