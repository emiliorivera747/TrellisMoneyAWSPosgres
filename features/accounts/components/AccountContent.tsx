"use client";
import React, { useRef } from "react";
import { dateFilterConfig } from "@/features/accounts/config/dateFilterConfig";

// Components
import ResponsiveLineGraphV2 from "@/components/dashboard/ResponsiveLineGraphV2";
import NetWorthGraph from "@/features/net-worth/components/net-worth-graph/NetWorthGraph";
import DateFilter from "@/features/accounts/components/DateFilter";
import AddConnection from "@/features/accounts/components/AddConnection";
import AccountsList from "@/features/accounts/components/AccountsList";
import PrimaryDashboardSection from "@/components/dashboard/PrimaryDashboardSection";

// Context
import { useAccountsContext } from "@/context/accounts/AccountContext";

// Types
import { useFilterNetWorth } from "@/features/net-worth/hooks/useFilterNetWorth";

// Hooks
import { useFetchAccounts } from "@/features/accounts/hooks/useFetchAccounts";

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

  const { accountsResponse } = useFetchAccounts();

  const { filteredData } = useFilterNetWorth({ filter, startDate, endDate });

  return (
    <section className="h-screen mx-[4%] mt-[3.2rem]">
      <div className="p-4 w-[70%] mt-[2%] max-h-screen">
        <PrimaryDashboardSection>
          <div className="flex gap-8">
            <div className="relative grid grid-rows-[26rem_6rem] h-[28rem] border-b w-[80%]">
              <ResponsiveLineGraphV2
                className={`w-full h-[20rem]`}
                ref={graphRef}
                GraphComponent={NetWorthGraph}
                linePayloads={filteredData}
              />
              <DateFilter
                handleDateFilterChange={handleDateFilterChange}
                dateFilter={dateFilterConfig}
              />
            </div>
          </div>
          <div className="grid grid-cols-[3fr_1fr] pt-8 w-full gap-8">
            <AccountsList
              accounts={accountsResponse?.data ? accountsResponse.data : []}
            />
          </div>
        </PrimaryDashboardSection>
      </div>
      {/* <div className="h-full w-[30%] sticky top-0 pt-[3%]">
        <AddConnection />
      </div> */}
    </section>
  );
};

export default AccountContent;
