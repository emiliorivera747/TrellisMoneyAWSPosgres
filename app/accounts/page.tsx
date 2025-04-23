"use client";

import React from "react";
import Link from "@/components/Plaid/Link";
import useGenerateToken from "@/hooks/plaid/useGenerateToken";

import { useAccounts } from "@/hooks/accounts/useAccounts";

const page = () => {
  const linkToken = useGenerateToken();
  const { accountsResponse, isErrorAccounts, isLoadingAccounts } =
    useAccounts();

  return (
    <section className="h-screen">
      <header className="mt-8 px-4">
        <h1 className="text-xl">Accounts</h1>
        <div className="h-full w-[30%] sticky top-0 pt-[2%]">
          <Link linkToken={linkToken} />
        </div>
        <div className="flex flex-col gap-4 mt-8">
          {isLoadingAccounts && <p>Loading...</p>}
          {isErrorAccounts && <p>Error</p>}
          {accountsResponse &&
            accountsResponse.data.map((account, i) => (
              <div key={i} className="border p-4 rounded">
                <h2 className="text-sm text-tertiary-1000 mb-2">
                  {JSON.stringify(account, null, 3)}
                </h2>
              </div>
            ))}
        </div>
      </header>
    </section>
  );
};

export default page;
