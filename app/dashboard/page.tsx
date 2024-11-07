"use client";

//React
import { useState, useEffect } from "react";

//Components
import SignOutButton from "@/components/buttons/SignOutButton";
import PrivateRoute from "@/components/private-route/PrivateRoute";

//Auth Context
import { useAuth } from "@/app/AuthContext";

import { fetchWithFirebaseHeaders } from "@/lib/fetchWithFireBaseHeaders";

interface ProtectedData {
  message: string;
  userId: string;
}

const Dashboard = () => {
  const { user } = useAuth();
  const [data, setData] = useState<ProtectedData | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetchWithFirebaseHeaders("/api/users");
        const result = await response.json();
        if (response.ok) {
          setData(result);
        } else {
          console.log(result.error);
        }
      } catch (error) {
        console.log(error);
      }
    }

    fetchData();
  }, []);

  return (
    <PrivateRoute>
      <div>
        {user && (
          <div>
            {/* <p>Email: {user? user?.email: "no name"}</p> */}
            <p>UID: {user ? user?.uid : "no name"}</p>
          </div>
        )}
        <SignOutButton />
      </div>
    </PrivateRoute>
  );
};

export default Dashboard;
