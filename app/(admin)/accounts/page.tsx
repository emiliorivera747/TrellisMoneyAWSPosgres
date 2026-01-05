"use client";
import { useRef, useState } from "react";

// Components
import ResponsiveLineGraphV2 from "@/components/dashboard/ResponsiveLineGraphV2";
import NetWorthGraph from "@/features/net-worth/components/net-worth-graph/NetWorthGraph";
import DateFilter from "@/features/accounts/components/filter/DateFilter";
import AddConnection from "@/features/add-connections/AddConnection";
import AccountsList from "@/features/accounts/components/list/AccountsList";
import PrimaryAccountSection from "@/features/accounts/components/sections/PrimaryAccountSection";
import AssetsAndLiabilitiesCard from "@/features/accounts/components/cards/AssetsAndLiabilitiesCard";
import AddAccount from "@/features/accounts/components/buttons/AddAccount";

// Context
import { ConnectionProvider } from "@/features/add-connections/context/ConnectionContext";

// Types
import { useFilterNetWorth } from "@/features/net-worth/hooks/useFilterNetWorth";

// Hooks
import useGroupAccounts from "@/features/accounts/hooks/useGroupAccounts";
import { useFetchAccounts } from "@/features/accounts/hooks/useFetchAccounts";

// Config
import { dateFilterConfig } from "@/features/accounts/config/dateFilterConfig";

/**
 *
 * Responsible for showing all of the accounts
 * and other important metrics
 *
 * @returns
 */
const page = () => {
  const graphRef = useRef<HTMLDivElement>(null);
  const [filter, setFilter] = useState<string>("net-worth");
  const [startDate, setStartDate] = useState<Date>(new Date());
  const [endDate, setEndDate] = useState<Date>(
    new Date(new Date().setFullYear(new Date().getFullYear() + 1))
  );

  const {
    accountsResponse,
    isLoadingAccounts,
    isErrorAccounts,
    accountsError,
  } = useFetchAccounts();

  const accounts = accountsResponse?.data?.accounts;
  const { groups = {} } = useGroupAccounts({ accounts });
  
  const handleDateFilterChange = (newStartData: Date, newEndData: Date) => {
    setStartDate(newStartData);
    setEndDate(newEndData);
  };

  const { filteredData } = useFilterNetWorth({ filter, startDate, endDate });

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
          <DateFilter
            handleDateFilterChange={handleDateFilterChange}
            dateFilter={dateFilterConfig}
          />
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
      <div className="h-full w-[18rem] sticky top-0  justify-start flex flex-col gap-4 pt-12">
        <AssetsAndLiabilitiesCard />
        <ConnectionProvider>
          <AddConnection>
            <AddAccount />
          </AddConnection>
        </ConnectionProvider>
      </div>
    </section>
  );
};

export default page;
