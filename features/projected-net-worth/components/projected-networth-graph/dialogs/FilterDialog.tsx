import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import DialogHeader from "@/features/accounts/components/headers/DialogHeader";
import RenderFilters from "@/features/projected-net-worth/components/projected-networth-graph/filters/RenderFilters";
import FilterIcon from "@/features/projected-net-worth/components/projected-networth-graph/icons/FilterIcon";

interface FilterDialogProps<T> {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  selectedFilter: T;
  onFilterChange: (filter: T) => void;
  label: string;
  filterConfigs: Array<{
    key: T;
    label: string;
    svgPath: string;
    color: string;
  }>;
}

const FilterDialog = <T,>({
  isOpen,
  onOpenChange,
  filterConfigs,
  selectedFilter,
  onFilterChange,
  label = "Filters",
}: FilterDialogProps<T>) => (
  <Dialog open={isOpen} onOpenChange={onOpenChange}>
    <DialogTrigger asChild>
      <div className="text-tertiary-1000 border border-tertiary-300 text-xs flex flex-row justify-center gap-2 p-3 px-4 rounded-[12px] hover:bg-tertiary-200 items-center">
        <FilterIcon />
        {label}
      </div>
    </DialogTrigger>
    <DialogContent className="shadow-lg" aria-describedby="dialog-description">
      <DialogHeader title="Filters" />
      <p id="dialog-description" className="sr-only">
        Select and apply filters to customize the graph data.
      </p>
      <RenderFilters
        filterConfigs={filterConfigs}
        selectedFilter={selectedFilter}
        handleFilterChange={onFilterChange}
      />
    </DialogContent>
  </Dialog>
);

export default FilterDialog;
