"use client";
import React from "react";
import NavBar from "@/components/nav-bars/NavBar";

//Forms
import SignInForm from "@/features/auth/components/form/SignInForm";

const LoginPage = () => {
  return (
    <div className="flex flex-col items-center justify-center m-h-screen h-auto min-w-screen w-auto">
      <div className="w-full">
        <NavBar />
      </div>
      <SignInForm />
    </div>
  );
};

export default LoginPage;
