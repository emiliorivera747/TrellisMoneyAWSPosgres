import React from "react";

import PrimaryDropDownMenuButton from "@/features/projected-net-worth/components/buttons/PrimaryYearButton";

import { ListOfYearsProps } from "@/features/projected-net-worth/types/graphComponents";


const ListOfYears = ({ years, actionFn }: ListOfYearsProps) => {
    if (!years || years.length === 0) {
        return <p>No years available</p>;
    }
    return (
        <>
            {years.map((year: number) => (
                <PrimaryDropDownMenuButton key={year} actionFn={() => actionFn(year)} year={year} />
            ))}
        </>
    );
};

export default ListOfYears;
