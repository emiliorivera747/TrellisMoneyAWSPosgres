// Components
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import DialogHeader from "@/features/accounts/components/headers/DialogHeader";
import RenderFilters from "@/components/graphs/filters/RenderFilters";
import FilterIcon from "@/components/graphs/filters/FilterIcon";

// Types
import { GraphFilterButtonWithDialogProps } from "@/types/components/admin/graphs/filters";

const GraphFilterButtonWithModal = <T,>({
  filterConfig,
  selectedFilter,
  handleFilterChange,
  label = "Filters",
}: GraphFilterButtonWithDialogProps<T>) => (
  <Dialog>
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
        filterConfig={filterConfig}
        selectedFilter={selectedFilter}
        handleFilterChange={handleFilterChange}
      />
    </DialogContent>
  </Dialog>
);

export default GraphFilterButtonWithModal;
