'use client';

// React
import React from "react";

// Next
import Head from "next/head";
import { useSearchParams } from "next/navigation";

// Components
import NavBar from "@/components/nav-bars/SecondaryNavbar";
import ResetPasswordForm from "@/features/auth/components/form/ResetPasswordForm";

const page = () => {
  const searchParams = useSearchParams();
  const code = searchParams.get("code");
  return (
    <>
      <Head>
        <title>Reset Password</title>
        <meta name="description" content="Reset your password using the code sent to your email." />
      </Head>
      <div className="flex flex-col items-center justify-center m-h-screen h-auto min-w-screen w-auto">
        <div className="w-full">
          <NavBar />
        </div>
        <ResetPasswordForm
          code={code ? code : null}
        />
      </div>
    </>
  );
};

export default page;
