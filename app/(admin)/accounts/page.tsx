"use client";

import { useRef } from "react";

// Components
import ResponsiveLineGraphV2 from "@/components/dashboard/ResponsiveLineGraphV2";
import NetWorthGraph from "@/features/net-worth/components/net-worth-graph/NetWorthGraph";
import DateFilter from "@/features/accounts/components/filter/DateFilter";
import AccountsList from "@/features/accounts/components/list/AccountsList";
import PrimaryAccountSection from "@/features/accounts/components/sections/PrimaryAccountSection";
import AssetsAndLiabilitiesCard from "@/features/accounts/components/cards/AssetsAndLiabilitiesCard";
import AddConnectionButtonAccount from "@/features/accounts/components/buttons/AddConnectionButtonAccount";

// Section
import SecondaryAccountSection from "@/features/accounts/components/sections/SecondaryAccountSection";

// Types
import { useFilterNetWorth } from "@/features/net-worth/hooks/useFilterNetWorth";

// Hooks
import useGroupAccounts from "@/features/accounts/hooks/useGroupAccounts";
import { useFetchAccounts } from "@/features/accounts/hooks/useFetchAccounts";

/**
 *
 * Responsible for showing all of the accounts
 * and other important metrics
 *
 * @returns
 */
const page = () => {
  const graphRef = useRef<HTMLDivElement>(null);

  const {
    accountsResponse,
    isLoadingAccounts,
    isErrorAccounts,
    accountsError,
  } = useFetchAccounts();

  const accounts = accountsResponse?.data?.accounts;
  const { groups = {} } = useGroupAccounts({ accounts });

  const { filteredData } = useFilterNetWorth();

  return (
    <section className="h-screen mx-[2%] overflow-y-scroll no-scrollbar flex flex-row gap-8">
      <PrimaryAccountSection>
        <div className="relative grid grid-rows-[22rem_6rem] h-[32rem] border-b">
          <ResponsiveLineGraphV2
            className={`w-full h-[26rem]`}
            ref={graphRef}
            GraphComponent={NetWorthGraph}
            linePayloads={filteredData}
          />
          <DateFilter />
        </div>
        <div className=" pt-8 w-full gap-8">
          <AccountsList
            groups={groups}
            isLoadingAccounts={isLoadingAccounts}
            isErrorAccounts={isErrorAccounts}
            accountsError={accountsError}
          />
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
