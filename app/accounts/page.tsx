"use client";

import React from "react";
import Link from "@/components/Plaid/Link";
import useGenerateToken from "@/utils/hooks/plaid/useGenerateToken";

import { useAccounts } from "@/utils/hooks/accounts/useAccounts";

const page = () => {
  const linkToken = useGenerateToken();
  const { accounts, isErrorAccounts, isLoadingAccounts } = useAccounts();

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
          {accounts &&
            accounts.map((account) => (
              <div key={account.id} className="border p-4 rounded">
                <h2 className="text-lg">{account.name}</h2>
                <p>Balance: ${account.balances.current}</p>
              </div>
            ))}
        </div>
      </header>
    </section>
  );
};

export default page;
