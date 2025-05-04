import React from "react";

//Components
import NetworthCard from "@/features/key-statistics/components/NetWorthCard";
import MonthlyIncome from "@/features/key-statistics/components/MonthlyIncome";
import NetSpending from "@/features/key-statistics/components/NetSpending";

const KeyStatContainer = () => {
  return (
    <div className="mb-6">
      <h1 className="text-xl font-medium text-tertiary-900 pt-8 pb-4 border-b border-tertiary-300 mb-4">Key statistics</h1>
      <div className="grid grid-cols-4 grid-rows-[3rem] gap-4">
        <NetworthCard />
        <MonthlyIncome />
        <NetSpending />
        <NetworthCard />
        <MonthlyIncome />
        <NetSpending />
        <MonthlyIncome />
        <NetSpending />
      </div>
    </div>
  );
};

export default KeyStatContainer;
