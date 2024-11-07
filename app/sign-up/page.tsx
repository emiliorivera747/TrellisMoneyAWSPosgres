import React from "react";

// Components
import SignUpForm from "@/components/form/SignUpForm";
import NavBar from "@/components/NavBar";
import DashboardRedirect from "@/components/private-route/DashboardRedirect";

const page = () => {
  return (
    // <DashboardRedirect>
      <div className="flex flex-col items-center justify-center m-h-screen h-auto min-w-screen w-auto">
        <div className="w-full">
          <NavBar />
        </div>
        <SignUpForm />
      </div>
    // </DashboardRedirect>
  );
};

export default page;
