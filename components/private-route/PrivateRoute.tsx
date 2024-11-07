"use client"
import { useAuth } from "@/app/AuthContext";
import { useState, useEffect} from "react";
import { useRouter } from "next/navigation";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [isUserChecked, setIsUserChecked] = useState(false);

  useEffect(() => {
    if (!loading) {
      setIsUserChecked(true);
      if (!user){
         return router.push("/");
      }
    }
  }, []);

  if (!isUserChecked || loading) {
    return <div>Loading...</div>; // Show loading until auth status is confirmed
  }

  return children;
};

export default ProtectedRoute;
