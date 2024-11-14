"use client";
import { useAuth } from "@/app/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const DashboardRedirect= ({ children }: ProtectedRouteProps) => {
  const { user, authentication } = useAuth();
  const router = useRouter();
 

  useEffect(() => {

    /**
     * If the user is not authenticated and the app is not initializing, redirect to home page
     */
    if (authentication.authenticated && !authentication.initializing) {
      router.push("/dashboard");
    }
  }, [user, router, authentication]);

  /**
   * If the app is initializing, show a loading message
   */
  if (authentication.initializing) {
    return <div>Loading...</div>;
  }

  /**
   * If the user is not authenticated and the app is not initializing, render the children
   */
  if(!authentication.authenticated && !authentication.initializing){
    return children;
  }
};

export default DashboardRedirect;
