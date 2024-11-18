import React from "react";

// Components
import SignUpForm from "@/features/auth/components/form/SignUpForm";
import NavBar from "@/components/nav-bars/NavBar";

const page = () => {
  return (
    <div className="flex flex-col items-center justify-center m-h-screen h-auto min-w-screen w-auto">
      <div className="w-full">
        <NavBar />
      </div>
      <SignUpForm />
    </div>
  );
};

export default page;
