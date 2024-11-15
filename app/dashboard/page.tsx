'use client';

//React
import React from "react";

//Components
import SignOutButton from "@/features/auth/components/buttons/SignOutButton";
import DeleteUserButton from "@/features/auth/components/buttons/DeleteUserButton";
import PrivateRoute from "@/features/auth/components/private-route/PrivateRoute";

//Auth Context
// import getUser from "@/utils/getUser";

import { useAuth } from "@/providers/AuthContext";

const Dashboard = () => {

  const { user } = useAuth();

  return (
    <PrivateRoute>
      <div className="">
        {user && (
          <div>
            <p>Email: {user ? user?.email : "no name"}</p>
            <p>UID: {user ? user?.uid : "no name"}</p>
          </div>
        )}
        <SignOutButton />
        <DeleteUserButton />
      </div>
    </PrivateRoute>
  );
};

export default Dashboard;
