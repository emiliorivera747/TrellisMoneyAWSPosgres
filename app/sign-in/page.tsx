"use client";
import React from "react";
import NavBar from "@/components/nav-bars/NavBar";

//Forms
import SignInForm from "@/features/auth/components/form/SignInForm";

//Protected Route
import DashboardRedirect from "@/features/auth/components/private-route/DashboardRedirect";
const LoginPage = () => {
  return (
    <DashboardRedirect>
      <div className="flex flex-col items-center justify-center m-h-screen h-auto min-w-screen w-auto">
        <div className="w-full">
          <NavBar />
        </div>
        <SignInForm />
      </div>
    </DashboardRedirect>
  );
};

export default LoginPage;
