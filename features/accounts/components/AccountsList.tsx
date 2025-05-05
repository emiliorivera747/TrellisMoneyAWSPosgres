"use client";
import React, { useEffect, useState } from "react";
import { Account } from "@/types/plaid";

/**
 *
 * Responsible for showing all of the accounts
 *
 *
 * @param param0
 * @returns
 */
const AccountsList = ({ accounts }: { accounts: Account[] }) => {
  if (!accounts)
    return (
      <div className="text-center text-md text-tertiary-800">
        No accounts found
      </div>
    );

  console.log("accounts", accounts);
  useEffect(() => {}, [accounts]);

  return (
    <div>
      {accounts?.map((account: Account) => {
        return (
          <div
            key={account.account_id}
            className="border border-tertiary-400 p-4 rounded-[12px] mb-4"
          >
            {account.name}
          </div>
        );
      })}
    </div>
  );
};

export default AccountsList;
