"use client";

//React
import React, { useState, useEffect } from "react";

//Components
import SignOutButton from "@/features/auth/components/buttons/SignOutButton";
import DeleteUserButton from "@/features/auth/components/buttons/DeleteUserButton";

import { createClient } from "@/utils/supabase/client";

interface User {
  email: string;
  id: string;
  created_at?: string;
  last_sign_in_at?: string;
  phone?: string;
  role?: string;
  updated_at?: string;
  name?: string;
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
        setUser({ email: user.email ?? "", id: user.id ?? "" });
      }
    };
    fetchUser();
  }, []);

  return (
    <div>
      {user && (
        <div>
          <p>Email: {user ? user?.email : "no name"}</p>
          <p>UID: {user ? user?.id : "no name"}</p>
          {/* <p>Display Name: {user? user.:"No name"}</p> */}
        </div>
      )}
      <SignOutButton />
      <DeleteUserButton />
    </div>
  );
};

export default Dashboard;
