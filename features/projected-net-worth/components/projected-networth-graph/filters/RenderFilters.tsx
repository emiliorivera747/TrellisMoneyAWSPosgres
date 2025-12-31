//Config
import { filterConfig } from "@/features/projected-net-worth/config/filterConfig";

//Components
import LineGraphFilterButton from "@/components/buttons/LineGraphFilterButton";

//Types
import { LineGraphFilterButtonsProps } from "@/features/projected-net-worth/types/filters";
import { InflationFilters } from "@/features/projected-net-worth/types/filters";

/**
 *
 * Render filter
 *
 *
 * @param param0
 * @returns
 */
const RenderFilters = ({
  selectedFilter,
  handleFilterChange,
}: LineGraphFilterButtonsProps) => {
  return (
    <div className="grid grid-cols-3 gap-3 py-2">
      {filterConfig.map(
        (
          filter: {
            key: InflationFilters;
            label: string;
            svg_path: string;
            color: string;
          },
          index
        ) => (
          <LineGraphFilterButton
            key={index}
            isSelected={selectedFilter === filter.key}
            svg_path={filter.svg_path}
            label={filter.label}
            onClick={() => handleFilterChange(filter.key)}
            color={filter.color}
          />
        )
      )}
    </div>
  );
};

export default RenderFilters;
