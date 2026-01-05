import LineGraphTimeButton from "@/components/buttons/LineGraphTimeButton";
import { useAccountsFiltersActions } from "@/stores/slices/accounts/accountFilters.selectors";
import {
  dateFilterConfig,
  DateFilterConfigItem,
} from "@/features/accounts/config/dateFilterConfig";

/**
 *
 * DateFilter component displays a set of buttons for selecting a date range for a line graph.
 *
 * @returns {JSX.Element}
 */
const DateFilter = () => {
  const { setStartDate, setEndDate } = useAccountsFiltersActions();

  const handleDateFilterChange = (filter: DateFilterConfigItem) => {
    setStartDate(filter.startDate);
    setEndDate(filter.endDate);
  };

  return (
    <div className="flex flex-row items-center absolute bottom-8  ">
      {dateFilterConfig.map((filter, index) => {
        return (
          <LineGraphTimeButton
            key={index}
            label={filter.label}
            onClick={() => handleDateFilterChange(filter)}
          />
        );
      })}
    </div>
  );
};

export default DateFilter;
