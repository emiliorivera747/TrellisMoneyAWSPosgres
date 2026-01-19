// Components
import AccountListHeader from "@/features/accounts/components/headers/AccountListHeader";
import Accountcard from "@/features/accounts/components/cards/AccountCard";
import NoAccountsFound from "@/features/accounts/components/cards/NoAccountsFound";

// Types
// import { Account } from "@/app/generated/prisma/client";
import { AccountListProps } from "@/features/accounts/types/accounts";

/**
 *
 * Responsible for showing all of the accounts
 *
 *
 * @param accounts - The accounts to show
 * @returns
 */
const AccountsList = ({
  isLoadingAccounts,
  isErrorAccounts,
  groups,
  accountsError,
}: AccountListProps) => {
  if (isLoadingAccounts) return <div>Loading...</div>;
  if (isErrorAccounts) return <div>{accountsError?.message}</div>;
  if (!groups || Object.keys(groups).length === 0) return <NoAccountsFound />;

  return (
    <div className="pb-10">
      {Object.entries(groups).map(([type, accounts]) => {
        return (
          <div key={type}>
            <AccountListHeader type={type} />
            {accounts?.map((account) => {
              return <Accountcard key={account.accountId} account={account} />;
            })}
          </div>
        );
      })}
    </div>
  );
};

export default AccountsList;
