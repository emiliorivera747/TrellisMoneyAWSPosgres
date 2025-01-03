import React from "react";

import PrimaryDropDownMenuButton from "@/features/projected-net-worth/components/buttons/PrimaryDropDownMenuButton";

import { ListOfYearsProps } from "@/features/projected-net-worth/types/graphComponents";

const ListOfYears = ({ years, actionFn }: ListOfYearsProps) => {
    return (
        <>
            {years?.map((year: number) => {
                return (
                    <PrimaryDropDownMenuButton key={year} actionFn={() => actionFn(year)} year={year} />
                );
            })}
        </>
    );
};

export default ListOfYears;
