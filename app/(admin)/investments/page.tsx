"use client";
import { useEffect, useState } from "react";
import useFetchHoldings from "@/hooks/react-query/holdings/useFetchHoldings";
import { convertToMoney } from "@/utils/helper-functions/formatting/convertToMoney";

const page = () => {
  const { holdingsData, holdingsError, holdingsLoading, holdingsHasError } =
    useFetchHoldings();

  const [groupedHoldings, setGroupedHolding] = useState<
    { name: string; totalShares: number; totalInstitutionValue: number }[]
  >([]);

  useEffect(() => {
    const accounts = holdingsData?.data?.household?.accounts;
    const holdings = accounts?.flatMap((account) => account?.holdings);
    const groups = Object.groupBy(
      holdings ?? [],
      (holding) => holding.security.ticker_symbol ?? "Unknown"
    );

    const groupedResults = Object.entries(groups).map(([key, holdings]) => {
      const totalShares = (holdings ?? []).reduce(
        (acc, val) => acc + Number(val?.quantity ?? 0), // Assuming 'quantity' is the correct property
        0
      );
      const totalInstitutionValue = (holdings ?? []).reduce(
        (acc, val) => acc + (Number(val.institution_value) ?? 0),
        0
      );
      return {
        name: key,
        totalShares,
        totalInstitutionValue,
      };
    });

    let sorted = groupedResults.sort(
      (a, b) => b.totalInstitutionValue - a.totalInstitutionValue
    );

    setGroupedHolding(sorted);
  }, [holdingsData]);

  return (
    <section className="h-screen overflow-scroll">
      <header className="mt-8 px-8">
        <header className="font-bold text-xl pb-4 mt-[3.4rem]">
          All Investments
        </header>
        <pre className="text-xs whitespace-pre-wrap flex flex-col gap-2">
          {groupedHoldings?.map(
            ({ name, totalShares, totalInstitutionValue }) => {
              return (
                <div
                  className="grid grid-cols-2 border rounded-[12px] py-[0.5rem] w-[30rem] items-center"
                  key={name}
                >
                  <span className="px-4 flex flex-col gap-2">
                    {name}
                    <span className="font-extralight text-tertiary-800">
                      {convertToMoney(totalShares)} shares
                    </span>
                  </span>
                  <span className="font-semibold flex justify-end px-4 text-[0.8rem]">
                    {convertToMoney(totalInstitutionValue)}
                  </span>
                </div>
              );
            }
          )}

          {/* {JSON.stringify(holdingsData, null, 2)} */}
        </pre>
      </header>
    </section>
  );
};

export default page;
