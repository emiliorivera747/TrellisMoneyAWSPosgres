"use client";

//React
import React, { useState, useEffect } from "react";

//Components
import SignOutButton from "@/features/auth/components/buttons/SignOutButton";
// import DeleteUserButton from "@/features/auth/components/buttons/DeleteUserButton";

import { createClient } from "@/utils/supabase/client";

interface User {
  email: string;
  uid: string;
}
const Dashboard = () => {
  const supabase = createClient();
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (user) {
        setUser({ email: user.email ?? "", uid: user.id ?? "" });
      }
    };

    fetchUser();
  }, []);

  return (
    <div className="">
      {user && (
        <div>
          <p>Email: {user ? user?.email : "no name"}</p>
          <p>UID: {user ? user?.uid : "no name"}</p>
        </div>
      )}
      <SignOutButton />
      {/* <DeleteUserButton /> */}
    </div>
  );
};

export default Dashboard;
