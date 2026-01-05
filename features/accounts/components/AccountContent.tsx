"use client";
import { useRef } from "react";
import { dateFilterConfig } from "@/features/accounts/config/dateFilterConfig";

// Components
import ResponsiveLineGraphV2 from "@/components/dashboard/ResponsiveLineGraphV2";
import NetWorthGraph from "@/features/net-worth/components/net-worth-graph/NetWorthGraph";
import DateFilter from "@/features/accounts/components/DateFilter";
import AddConnection from "@/features/accounts/components/AddConnection";
import AccountsList from "@/features/accounts/components/AccountsList";
import PrimaryAccountSection from "@/features/accounts/components/PrimaryAccountSection";
import AssetsAndLiabilitiesCard from "@/features/accounts/components/AssetsAndLiabilitiesCard";
import AddAccount from "./buttons/AddAccount";

// Context
import { useAccountsContext } from "@/context/accounts/AccountContext";
import { ConnectionProvider } from "@/features/accounts/context/ConnectionContext";

// Types
import { useFilterNetWorth } from "@/features/net-worth/hooks/useFilterNetWorth";

/**
 *
 * Responsible for showing all of the accounts
 * and other important metrics
 *
 * @returns
 */
const AccountContent = () => {
  const graphRef = useRef<HTMLDivElement>(null);

  const { filter, startDate, endDate, handleDateFilterChange } =
    useAccountsContext();

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
          <AccountsList />
        </div>
      </PrimaryAccountSection>

      <div className="h-full w-[25%] sticky top-0  justify-start flex flex-col gap-4 pt-12">
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

export default AccountContent;
