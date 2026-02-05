"use client";

// Components
import AccountsList from "@/features/accounts/components/list/AccountsList";
import PrimaryAccountSection from "@/features/accounts/components/sections/PrimaryAccountSection";
import SecondaryAccountSection from "@/features/accounts/components/sections/SecondaryAccountSection";
import AssetsAndLiabilitiesCard from "@/features/accounts/components/cards/AssetsAndLiabilitiesCard";
import AddConnectionButtonAccount from "@/features/accounts/components/buttons/AddConnectionButtonAccount";
import RefreshAccounts from "@/features/accounts/components/buttons/RefreshAccounts";
import AccountNetWorthGraph from "@/features/accounts/components/graph/AccountNetWorthGraph";

// Hooks
import useGroupAccounts from "@/features/accounts/hooks/useGroupAccounts";
import { useFetchAccounts } from "@/features/accounts/hooks/useFetchAccounts";

/**
 *
 * Responsible for showing all of the accounts
 * and other important metrics
 *
 */
const page = () => {
  const {
    accountsResponse,
    isLoadingAccounts,
    isErrorAccounts,
    accountsError,
  } = useFetchAccounts();

  const accounts = accountsResponse?.data?.accounts;
  const { groups = {} } = useGroupAccounts({ accounts: accounts });

  return (
    <section className="h-screen mx-[2%] overflow-y-scroll no-scrollbar flex flex-row gap-8 max-w-screen">
      <PrimaryAccountSection>
        <AccountNetWorthGraph />
        <div className="pt-8 w-full gap-8">
          <AccountsList
            groups={groups}
            isLoadingAccounts={isLoadingAccounts}
            isErrorAccounts={isErrorAccounts}
            accountsError={accountsError}
          />
          <RefreshAccounts />
        </div>
      </PrimaryAccountSection>
      <SecondaryAccountSection>
        <AssetsAndLiabilitiesCard />
        <AddConnectionButtonAccount />
      </SecondaryAccountSection>
    </section>
  );
};

export default page;
