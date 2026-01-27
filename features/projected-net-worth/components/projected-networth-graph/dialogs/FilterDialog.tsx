import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import DialogHeader from "@/features/accounts/components/headers/DialogHeader";
import RenderFilters from "@/features/projected-net-worth/components/projected-networth-graph/filters/RenderFilters";
import FilterIcon from "@/features/projected-net-worth/components/projected-networth-graph/icons/FilterIcon";
import { InflationFilters } from "@/features/projected-net-worth/types/filters";

interface FilterDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  selectedFilter: InflationFilters;
  onFilterChange: (filter: InflationFilters) => void;
}

const FilterDialog = ({
  isOpen,
  onOpenChange,
  selectedFilter,
  onFilterChange,
}: FilterDialogProps) => (
  <Dialog open={isOpen} onOpenChange={onOpenChange}>
    <DialogTrigger asChild>
      <button className="text-tertiary-1000 border border-tertiary-300 text-xs flex flex-row justify-center gap-2 p-3 px-4 rounded-[12px] hover:bg-tertiary-200 items-center">
        <FilterIcon />
        Filters
      </button>
    </DialogTrigger>
    <DialogContent className="shadow-lg" aria-describedby="dialog-description">
      <DialogHeader title="Filters" />
      <p id="dialog-description" className="sr-only">
        Select and apply filters to customize the graph data.
      </p>
      <RenderFilters
        selectedFilter={selectedFilter}
        handleFilterChange={onFilterChange}
      />
    </DialogContent>
  </Dialog>
);

export default FilterDialog;
