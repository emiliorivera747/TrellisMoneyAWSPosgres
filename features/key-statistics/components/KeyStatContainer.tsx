import React from "react";

//Components
import NetworthCard from "@/features/key-statistics/components/NetWorthCard";
import MonthlyIncome from "@/features/key-statistics/components/MonthlyIncome";
import NetSpending from "@/features/key-statistics/components/NetSpending";

const KeyStatContainer = () => {
  return (
    <div className="">
      <h1 className="text-xl font-semibold text-tertiary-900 py-4">Key statistics</h1>
      <div className="grid grid-cols-3">
        <NetworthCard />
        <MonthlyIncome />
        <NetSpending />
      </div>
    </div>
  );
};

export default KeyStatContainer;
