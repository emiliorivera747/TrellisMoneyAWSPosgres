'use client';
import React from "react";
import Link from "@/components/Plaid/Link";
import useGenerateToken from "@/utils/hooks/plaid/useGenerateToken";

const page = () => {
  const linkToken = useGenerateToken();
  return (
    <section className="h-screen">
      <header className="mt-8 px-4">
        <h1 className="text-xl">Accounts</h1>
        <div className="h-full w-[30%] sticky top-0 pt-[2%]">
          <Link linkToken={linkToken} />
        </div>
      </header>
    </section>
  );
};

export default page;
