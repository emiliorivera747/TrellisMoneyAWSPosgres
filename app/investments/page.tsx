'use client'
import React from "react";
import { useInvestments } from "@/utils/hooks/investments/useInvestments";

const page = () => {
  const { investmentsResponse, isLoadingInvestments, isErrorInvestments } =
    useInvestments();
  return (
    <section className="h-screen">
      <header className="mt-8 px-4">
        <h1 className="text-xs">{JSON.stringify(investmentsResponse?.data)}</h1>
      </header>
    </section>
  );
};

export default page;
