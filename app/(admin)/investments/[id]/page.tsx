"use client";
import useFetchAggregateHoldings from "@/hooks/react-query/holdings/useFetchAggregateHoldings";
import { convertToMoney } from "@/utils/helper-functions/formatting/convertToMoney";
import { use } from "react";
import HoldingHeader from "@/features/holding/components/headers/HoldingHeader";
import MarketValueCards from "@/features/holding/components/cards/MarketValueCards";

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
    <section className="h-screen overflow-scroll">
      <header className="mt-[3.5rem] px-8">
        <HoldingHeader holding={holding} />
        <MarketValueCards holding={holding} />
        <div className="mb-4 font-semibold">Holdings by Account</div>
        <div className="flex flex-col gap-2">
          {holding.holdings.map((h) => (
            <div
              key={h.holdingId}
              className="bg-white border rounded-[12px] p-4 max-w-2xl hover:shadow-md"
            >
              <div className="flex justify-between items-start mb-3">
                <div>
                  <div className="font-medium">{h.account.name}</div>
                  <div className="text-sm text-tertiary-800">
                    {h.member.name}
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-semibold">
                    {convertToMoney(h.totalValue)}
                  </div>
                  <div className="text-sm text-tertiary-800">
                    {h.shares.toFixed(4)} shares
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-2 text-sm">
                <div>
                  <div className="text-tertiary-800">Cost Basis</div>
                  <div>{convertToMoney(h.averageCost)}</div>
                </div>
                <div>
                  <div className="text-tertiary-800">Return</div>
                  <div
                    className={
                      h.totalReturn >= 0
                        ? "text-secondary-1000"
                        : "text-red-600"
                    }
                  >
                    {convertToMoney(h.totalReturn)}
                  </div>
                </div>
                <div className="flex justify-end items-center text-tertiary-700">
                  <div>
                    {Math.floor(
                      (Date.now() - new Date(h.updatedAt).getTime()) /
                        (1000 * 60 * 60)
                    )}{" "}
                    hours ago
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </header>
    </section>
  );
};

export default Page;
