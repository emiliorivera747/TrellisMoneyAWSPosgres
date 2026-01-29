import LineGraphFilterButton from "@/components/buttons/LineGraphFilterButton";
import { LineGraphFilterButtonsProps } from "@/types/components/admin/graphs/filters";
import { cn } from "@/lib/utils";

import { useAccountsFiltersWithActions } from "@/stores/slices/accounts/accountFilters.selectors";

const Filter = ({
  filterConfig,
  innerRef,
  className,
}: LineGraphFilterButtonsProps) => {
  const defaultClass = "grid grid-cols-3 gap-3 py-2";
  const { selectedFilter, setSelectedFilter } =
  useAccountsFiltersWithActions();
  return (
    <div ref={innerRef} className={cn(defaultClass, className)}>
      {filterConfig.map((filter, index) => (
        <LineGraphFilterButton
          key={index}
          isSelected={selectedFilter === filter.key}
          svgPath={filter.svgPath}
          label={filter.label}
          onClick={() => setSelectedFilter(filter.key)}
          color={filter.color}
        />
      ))}
    </div>
  );
};

export default Filter;
