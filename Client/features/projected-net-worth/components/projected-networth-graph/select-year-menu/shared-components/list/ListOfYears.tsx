import React from "react";

import PrimaryMenuButton from "@/components/buttons/PrimaryMenuButtons";
import { ListOfYearsProps } from "@/features/projected-net-worth/types/selectYearMenu";

/**
 * Component that renders a list of years as buttons.
 *
 * @param {Object} props - The component props.
 * @param {number[]} props.years - An array of years to be displayed as buttons.
 * @param {Function} props.actionFn - A function to be called when a year button is clicked.
 *
 * @returns {JSX.Element} A list of buttons representing the years, or a message if no years are available.
 */
const ListOfYears = ({ years, actionFn }: ListOfYearsProps): JSX.Element => {
    if (!years || years.length === 0) {
        return <p>No years available</p>;
    }
    return (
        <>
            {years.map((year: number) => (
                <PrimaryMenuButton key={year} actionFn={() => actionFn(year)} label={year} />
            ))}
        </>
    );
};

export default ListOfYears;
