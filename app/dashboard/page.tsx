"use client";
import React, { useState, useEffect } from "react";

//Components
import SignOutButton from "@/features/auth/components/buttons/SignOutButton";
import DeleteUserButton from "@/features/auth/components/buttons/DeleteUserButton";
// import { createClient } from "@/utils/supabase/server";
// import { Metadata } from "next";
import Link from "@/components/Plaid/Link";
import { use } from "chai";

// export const metadata: Metadata = {
//   title: "Dashboard",
//   description:
//     "View your financial forecast, net worth, and investment goals all in one place.",
//   keywords: [
//     "dashboard",
//     "net worth",
//     "financial forecast",
//     "investment goals",
//     "financial information",
//   ],
// };

const Dashboard = () => {
  // const supabase = await createClient();
  // const {
  //   data: { user },
  // } = await supabase.auth.getUser();
  const [linkToken, setLinkToken] = useState(null);
  
  const generateToken = async () => {
    const response = await fetch("/api/plaid/create-link-token", {
      method: "POST",
    });
    const data = await response.json();
    setLinkToken(data.link_token);
  };

  //access-sandbox-84fad6ac-6518-4101-97db-e17fd1435e4a
  const getAccountInfo = async () => {
    const response = await fetch("/api/plaid/account", {
      method: "POST",
      headers: {
      "Content-Type": "application/json",
      },
      body: JSON.stringify({ access_token: "access-sandbox-84fad6ac-6518-4101-97db-e17fd1435e4a" }),
    });

    const data = await response.json();
    console.log(data);
  };
  useEffect(() => {
    generateToken();
  }, []);
  useEffect(() => {
    getAccountInfo();
  }, []);

  return (
    <div>
      {/* {user && (
        <div>
          <p>Email: {user ? user?.email : "no name"}</p>
          <p>UID: {user ? user?.id : "no name"}</p>
        </div>
      )} */}
      {linkToken != null ? <Link linkToken={linkToken} /> : <></>}
      <SignOutButton />
      <DeleteUserButton />
    </div>
  );
};

export default Dashboard;
