import React from 'react';
import { SecurityData, RenderTooltipContentProps } from '@/types/dashboardComponents';

const getStockValue = (data: SecurityData): number => {
    return data.close;
};

const calculateRateOfChange = (initialValue: number, finalValue: number): number => {
    return ((finalValue - initialValue) / initialValue) * 100;
};

const calculateYearsBetween = (startDate: Date, endDate: Date): number => {
    return endDate.getFullYear() - startDate.getFullYear();
};

const RenderTooltipContent: React.FC<RenderTooltipContentProps> = ({ tooltipData, data }) => {
    if (!tooltipData) {
        return <>$500</>;
    }

    const stockValueDifference = getStockValue(tooltipData) - data[0].close;
    const rateOfChange = calculateRateOfChange(data[0].close, getStockValue(tooltipData));
    const yearsBetween = calculateYearsBetween(new Date(data[0].date), new Date(tooltipData.date));

    return (
        <>
            {" $" + stockValueDifference.toFixed(2) + " (" + rateOfChange.toFixed(2) + "%) "}
            <span className="text-zinc-600 font-normal ">
                {yearsBetween + " years"}
            </span>
        </>
    );
};

export default RenderTooltipContent;