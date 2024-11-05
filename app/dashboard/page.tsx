"use client";

//Components
import SignOutButton from "@/components/buttons/SignOutButton";
import PrivateRoute from "@/components/private-route/PrivateRoute";

const Dashboard = () => {

  return (
    <PrivateRoute>
      <div>
        <SignOutButton />
      </div>
    </PrivateRoute>
  );
};

export default Dashboard;
