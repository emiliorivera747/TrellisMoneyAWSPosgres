import LineGraphTimeButton from "@/components/buttons/LineGraphTimeButton";
import { useAccountsFiltersWithActions } from "@/stores/slices/accounts/accountFilters.selectors";
import { AccountGraphFilter } from "@/features/accounts/types/graph";

type NetWorthTypeFilterConfig = {
  label: string;
  value: AccountGraphFilter;
};

const netWorthTypeFilterConfig: NetWorthTypeFilterConfig[] = [
  {
    label: "Net Worth",
    value: "net-worth",
  },
  {
    label: "Assets & Liabilities",
    value: "assets-liabilities",
  },
];

const NetWorthTypeFilter = () => {
  const { selectedFilter, setSelectedFilter } = useAccountsFiltersWithActions();

  return (
    <div className="flex flex-row items-center gap-1">
      {netWorthTypeFilterConfig.map((filter) => (
        <LineGraphTimeButton
          key={filter.value}
          label={filter.label}
          className={
            selectedFilter === filter.value
              ? "bg-tertiary-200 border border-tertiary-400"
              : ""
          }
          onClick={() => setSelectedFilter(filter.value)}
        />
      ))}
    </div>
  );
};

export default NetWorthTypeFilter;
