"use client";
import React from "react";
import { useInvestments } from "@/hooks/investments/useInvestments";

const page = () => {
  // const { investmentsResponse, isLoadingInvestments, isErrorInvestments } =
  //   useInvestments();
  return (
    <section className="h-screen overflow-scroll">
      <header className="mt-8 px-4">
        {/* <h1 className="text-xs">{JSON.stringify(investmentsResponse?.data)}</h1> */}
      </header>
    </section>
  );
};

export default page;
