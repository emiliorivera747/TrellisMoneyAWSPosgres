// Types
import { GraphHeaderWithFilterProps } from "@/types/components/admin/graphs/props";

// Component
import GraphHeader from "@/components/headers/GraphHeader";
import GraphFilterButtonWithModal from "@/components/buttons/GraphFilterButtonWithModal";

const GraphHeaderWithFilter: React.FC<GraphHeaderWithFilterProps> = ({
  label,
  filterConfig,
  filterRef,
}) => {
  return (
    <div className="flex flex-row justify-between">
      <GraphHeader label={label} />
      <GraphFilterButtonWithModal
        filterConfig={filterConfig}
        ref={filterRef}
        className="grid grid-cols-2"
      />
    </div>
  );
};

export default GraphHeaderWithFilter;
