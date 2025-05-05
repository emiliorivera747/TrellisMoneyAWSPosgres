"use client";
import React, { useEffect, useState } from "react";
import { Account, GroupedAccounts } from "@/types/plaid";

/**
 *
 * Responsible for showing all of the accounts
 *
 *
 * @param param0
 * @returns
 */
const AccountsList = ({ accounts }: { accounts: Account[] }) => {
  const [groups, setGroups] = useState<GroupedAccounts>({});
  if (!accounts)
    return (
      <div className="text-center text-md text-tertiary-800">
        No accounts found
      </div>
    );

  useEffect(() => {
    const groupedAccounts = accounts.reduce(
      (acc: { [key: string]: Account[] }, account) => {
        const { type } = account;
        if (!acc[type]) {
          acc[type] = [];
        }
        acc[type].push(account);
        return acc;
      },
      {}
    );
    setGroups(groupedAccounts);
  }, [accounts]);

  return (
    <div>
      {Object.entries(groups).map(([type, accounts]) => {
        return (
          <div>
            <h1 className="text-[1.4rem] font-bold pb-2">
              {type.charAt(0).toUpperCase() + type.slice(1)}
            </h1>
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
      })}
    </div>
  );
};

export default AccountsList;
