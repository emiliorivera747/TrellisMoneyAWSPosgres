

import React, { useState } from 'react';
interface GroupedDateSelectorProps {
    years: number[];
    retirementYear: number;
    setSelectedYear: (year: number) => void;
}

const GroupedDateSelector = ({ years, retirementYear, setSelectedYear }: GroupedDateSelectorProps) => {
    const [showBeforeRetirement, setShowBeforeRetirement] = useState(true);
    const [showAfterRetirement, setShowAfterRetirement] = useState(true);

    const beforeRetirementYears = years.filter(year => year < retirementYear);
    const afterRetirementYears = years.filter(year => year >= retirementYear);

    return (
        <div>
            <div>
                <button onClick={() => setShowBeforeRetirement(!showBeforeRetirement)}>
                    {showBeforeRetirement ? 'Hide' : 'Show'} Years Before Retirement
                </button>
                {showBeforeRetirement && (
                    <div>
                        {beforeRetirementYears.map(year => (
                            <button
                                className="text-tertiary-900 border"
                                key={year}
                                onClick={() => setSelectedYear(year)}
                            >
                                {year} ({retirementYear - year} years to retirement)
                            </button>
                        ))}
                    </div>
                )}
            </div>
            <div>
                <button onClick={() => setShowAfterRetirement(!showAfterRetirement)}>
                    {showAfterRetirement ? 'Hide' : 'Show'} Years After Retirement
                </button>
                {showAfterRetirement && (
                    <div>
                        {afterRetirementYears.map(year => (
                            <button
                                className="text-tertiary-900 border"
                                key={year}
                                onClick={() => setSelectedYear(year)}
                            >
                                {year} (After retirement)
                            </button>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default GroupedDateSelector;