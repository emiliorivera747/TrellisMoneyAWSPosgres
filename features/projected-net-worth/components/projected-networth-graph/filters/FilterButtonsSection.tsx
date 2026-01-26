import React from 'react'

// Components
import LineGraphFilterButton from '@/components/buttons/LineGraphFilterButton';

interface FilterButtonsSectionProps {
    buttons: {
        isSelected: boolean;
        svgPath: string;
        label: string;
        onClick: () => void;
    }[];
}

const FilterButtonsSection: React.FC<FilterButtonsSectionProps> = ({ buttons }) => {
    return (
        <div className="gap-2 mt-4 grid grid-cols-6 items-center border-b border-tertiary-300 pb-6">
            {buttons.map((button, index) => (
                <LineGraphFilterButton
                    key={index}
                    isSelected={button.isSelected}
                    svgPath={button.svgPath}
                    label={button.label}
                    onClick={button.onClick}
                />
            ))}
        </div>
    )
}

export default FilterButtonsSection