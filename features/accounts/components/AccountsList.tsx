import React from "react";

import { Account } from "@/types/plaid";

import NoAccountsFound from "@/features/accounts/components/NoAccountsFound";

import { useAccountsContext } from "@/context/accounts/AccountContext";

//Components
import AccountListHeader from "@/features/accounts/components/headers/AccountListHeader";
import Accountcard from "@/features/accounts/components/AccountCard";

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

  console.log(groups);

  if (isLoadingAccounts) return <div>Loading...</div>;
  if (isErrorAccounts) return <div>Error</div>;
  if (!groups || Object.keys(groups).length === 0) return <NoAccountsFound />;

  return (
    <div className="pb-10">
      {Object.entries(groups).map(([type, accounts]) => {
        return (
          <div key={type}>
            <AccountListHeader type={type} />
            {accounts?.map((account: Account) => {
              return <Accountcard key={account.account_id} account={account} />;
            })}
          </div>
        );
      })}
    </div>
  );
};

export default AccountsList;
