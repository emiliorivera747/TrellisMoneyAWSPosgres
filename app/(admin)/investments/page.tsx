"use client";
import { useInvestments } from "@/hooks/investments/useInvestments";

const page = () => {
  const { investmentsResponse, isLoadingInvestments, isErrorInvestments } =
    useInvestments();
  return (
    <section className="h-screen overflow-scroll">
      <header className="mt-8 px-4">
        <pre className="text-xs whitespace-pre-wrap">
          {JSON.stringify(investmentsResponse?.data, null, 2)}
        </pre>
      </header>
    </section>
  );
};

export default page;
