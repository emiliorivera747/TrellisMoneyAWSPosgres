"use client";

// React
import { use } from "react";

// Components
import MarketValueCards from "@/features/holding/components/cards/MarketValueCards";
import AverageCostCard from "@/features/holding/components/cards/AverageCostCard";
import AccountWithHoldingCard from "@/features/holding/components/cards/AccountWithHoldingCard";
import PrimaryAccountSection from "@/features/accounts/components/sections/PrimaryAccountSection";
import HoldingHistoryGraph from "@/features/holding/components/graphs/HoldingHistoryGraph";

// Hooks
import useFetchAggregateHoldings from "@/hooks/react-query/holdings/useFetchAggregateHoldings";

const Page = ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = use(params);
  const { aggregateData, aggregateLoading, aggregateHasError, aggregateError } =
    useFetchAggregateHoldings(id);

  if (aggregateLoading) {
    return (
      <section className="h-screen flex items-center justify-center">
        <div>Loading...</div>
      </section>
    );
  }

  if (aggregateHasError) {
    return (
      <section className="h-screen flex items-center justify-center">
        <div>Error: {aggregateError?.message || "Failed to load data"}</div>
      </section>
    );
  }

  const holding = aggregateData?.data;

  if (!holding) {
    return (
      <section className="h-screen flex items-center justify-center">
        <div>No data found</div>
      </section>
    );
  }

  return (
    <section className="h-screen mx-[2%] overflow-y-scroll no-scrollbar flex flex-row gap-8 max-w-screen">
      <PrimaryAccountSection>
        <HoldingHistoryGraph securityId={id} holding={holding} />
        <div className="grid grid-cols-2 sm:gap-4 gap-3 mb-6 w-full mt-6">
          <MarketValueCards holding={holding} />
          <AverageCostCard holding={holding} />
        </div>
        <div className="mb-4 font-light text-tertiary-800 text-[1.2rem] mt-4">
          Positions
        </div>
        <div className="flex flex-col gap-2 w-full pb-10">
          {holding.holdings.map((h) => (
            <AccountWithHoldingCard holding={h} key={h.holdingId} />
          ))}
        </div>
      </PrimaryAccountSection>
    </section>
  );
};

export default Page;
