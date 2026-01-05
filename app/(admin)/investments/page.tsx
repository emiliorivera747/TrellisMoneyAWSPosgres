"use client";
import { useEffect } from "react";
import useFetchHoldings from "@/hooks/react-query/holdings/useFetchHoldings";
const page = () => {
  const { holdingshData, holdingsError, holdingsLoading, holdingsHasError } =
    useFetchHoldings();

  useEffect(() => {}, [holdingshData]);
  return (
    <section className="h-screen overflow-scroll">
      <header className="mt-8 px-4">
        <pre className="text-xs whitespace-pre-wrap">
          {JSON.stringify(holdingshData?.data, null, 2)}
        </pre>
      </header>
    </section>
  );
};

export default page;
