import React from "react";

//Functions
import { calculateProjectedAmount } from "@/utils/helper-functions/calculatetProjectedAmount";

interface ProjectedHoldingsCardProps {
    numberOfYears: Number;
    holdings: {
        title: string;
        data: {
            symbol: string;
            amount: number;
            yearlyPercentGrowth: number;
            shares: number;
        }[];
    }[];
}

const ProjectedHoldingsCard: React.FC<ProjectedHoldingsCardProps> = ({ numberOfYears, holdings }) => {
    return (
        <aside
            style={{
                border: "1px solid rgb(221, 221, 221)",
                scrollbarWidth: "none",
            }}
            className="col-span-3 row-span-6 rounded overflow-y-auto sticky"
        >
            <div className="flex flex-col gap-1 absolute overflow-hidden w-full text-[#343a40]">
                <div className="font-bold text-zinc-800 flex items-center gap-1 justify-start p-4">
                    <span className="text-sm tracking-wider">Projected Holdings</span>
                </div>

                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="border-y border-[#e9ecef]">
                        <tr>
                            <th
                                scope="col"
                                className="px-4 py-3 text-left text-xs font-medium text-[#343a40] uppercase tracking-wider"
                            >
                                Holding
                            </th>
                            <th
                                scope="col"
                                className="px-4 py-3 text-left text-xs font-medium text-[#343a40] uppercase tracking-wider"
                            >
                                AGR
                            </th>
                            <th
                                scope="col"
                                className="px-4 py-3 text-left text-xs font-medium text-[#343a40] uppercase tracking-wider"
                            >
                                Proj
                            </th>
                        </tr>
                    </thead>
                    <tbody className="bg-white">
                        {holdings.map((holdingItem, index) => (
                            <React.Fragment key={index}>
                                <tr className="hover:bg-[#f8f9fa]">
                                    <td
                                        colSpan={3}
                                        className="px-4 py-3 whitespace-nowrap text-xs font-bold text-gray-900"
                                    >
                                        {holdingItem.title}
                                    </td>
                                </tr>

                                {holdingItem.data.map((holding, subIndex) => (
                                    <tr
                                        key={subIndex}
                                        className="hover:bg-[#f8f9fa] transition ease-in-out delay-150"
                                    >
                                        <td className="px-4 py-3 whitespace-nowrap text-[0.6rem] text-gray-900">
                                            <div className="flex flex-col justify-center">
                                                <span className="text-xs font-semibold">
                                                    {holding.symbol}
                                                </span>
                                                <span className="text-xs font-normal">
                                                    {holding.shares} shares
                                                </span>
                                            </div>
                                        </td>
                                        <td
                                            className="px-4 py-3 whitespace-nowrap text-xs"
                                            style={{
                                                color:
                                                    holding.yearlyPercentGrowth > 0
                                                        ? "#2f9e44"
                                                        : "#c92a2a",
                                            }}
                                        >
                                            <button className="border rounded p-1 text-xs">
                                                {holding.yearlyPercentGrowth}%
                                            </button>
                                        </td>
                                        <td className="px-4 py-3 whitespace-nowrap text-xs text-gray-900">
                                            {"$" + calculateProjectedAmount(holding.amount, holding.yearlyPercentGrowth, 1).toFixed(2)}
                                        </td>
              
                                    </tr>
                                ))}
                            </React.Fragment>
                        ))}
                    </tbody>
                </table>
            </div>
        </aside>
    );
};

export default ProjectedHoldingsCard;

