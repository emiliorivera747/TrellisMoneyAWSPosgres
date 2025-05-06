import React from "react";

import { Account } from "@/types/plaid";

import NoAccountsFound from "@/features/accounts/components/NoAccountsFound";

import { useAccountsContext } from "@/context/accounts/AccountContext";

/**
 *
 * Responsible for showing all of the accounts
 *
 *
 * @param accounts - The accounts to show
 * @returns
 */
const AccountsList = () => {
  const { isLoadingAccounts, isErrorAccounts, groups } =
    useAccountsContext() as {
      isLoadingAccounts: boolean;
      isErrorAccounts: boolean;
      groups: Record<string, Account[]>;
    };

  
  if (isLoadingAccounts) return <div>Loading...</div>;
  if (isErrorAccounts) return <div>Error</div>;
  if (!groups) return <NoAccountsFound />;

  return (
    <div>
      {Object.entries(groups).map(([type, accounts]) => {
        return (
          <div key={type}>
            {/* Header for each type */}
            <h1 className="text-[1.4rem] font-bold pb-3">
              {type.charAt(0).toUpperCase() + type.slice(1)}
            </h1>

            {/* Display Account Cards */}
            {accounts?.map((account: Account) => {
              return (
                <div
                  key={account.account_id}
                  className="rounded-[12px] mb-4 border py-6 px-4"
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
