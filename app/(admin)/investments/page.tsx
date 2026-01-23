"use client";
import { useEffect, useState } from "react";
import useFetchHoldings from "@/hooks/react-query/holdings/useFetchHoldings";
import { convertToMoney } from "@/utils/helper-functions/formatting/convertToMoney";
import Link from "next/link";
import RefreshInvestments from "@/features/investments/components/RefreshInvestments";

const page = () => {
  const { holdingsData, holdingsError, holdingsLoading, holdingsHasError } =
    useFetchHoldings();

  const [groupedHoldings, setGroupedHolding] = useState<
    {
      name: string;
      totalShares: number;
      totalInstitutionValue: number;
      securityId: string;
    }[]
  >([]);

  useEffect(() => {
    const accounts = holdingsData?.data?.accounts;
    const holdings = accounts?.flatMap((account) => account?.holdings);

    const groups = Object.groupBy(
      holdings ?? [],
      (holding) => holding.security?.tickerSymbol ?? "Unknown"
    );

    const groupedResults = Object.entries(groups).map(([key, holdings]) => {
      const totalShares = (holdings ?? []).reduce(
        (acc, holding) => acc + Number(holding?.quantity ?? 0),
        0
      );

      const totalInstitutionValue = (holdings ?? []).reduce(
        (acc, holding) => acc + (Number(holding?.institutionValue) ?? 0),
        0
      );

      return {
        name: key,
        totalShares,
        totalInstitutionValue,
        securityId: holdings?.[0]?.security?.securityId ?? "Unknown",
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
        <RefreshInvestments />
        <pre className="text-xs whitespace-pre-wrap flex flex-col gap-2">
          {groupedHoldings?.map(
            ({ name, totalShares, totalInstitutionValue, securityId }) => {
              return (
                <Link
                  href={`/investments/${securityId}`}
                  className="grid grid-cols-2 border rounded-[12px] py-[0.5rem] w-[30rem] items-center hover:shadow-md"
                  key={name}
                >
                  <span className="px-4 flex flex-col gap-1">
                    {name}
                    <span className="font-extralight text-tertiary-800">
                      {totalShares.toFixed(2)} shares
                    </span>
                  </span>
                  <span className="font-semibold flex justify-end px-4 text-[0.8rem]">
                    {convertToMoney(totalInstitutionValue)}
                  </span>
                </Link>
              );
            }
          )}
        </pre>
      </header>
    </section>
  );
};

export default page;
