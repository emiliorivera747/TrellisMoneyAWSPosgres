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
        return <>{data[data.length-1].year - data[0].year}</>;
    }

    const stockValueDifference = getStockValue(tooltipData) - data[0].close;
    const rateOfChange = calculateRateOfChange(data[0].close, getStockValue(tooltipData));
    const yearsBetween = tooltipData.year  - data[0].year  ;

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