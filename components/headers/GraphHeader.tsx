import { cn } from "@/lib/utils";

// Type
import { GraphHeaderProps } from "@/types/components/headers/graph-headers";
/**
 * A functional component that renders a styled header with a label.
 *
 * @param {Object} props - The component props.
 * @param {string} props.label - The text to display as the header label.
 * @returns {JSX.Element} A styled header element.
 */
const GraphHeader = ({ label, ref, className }: GraphHeaderProps) => {
  const defaultClassName =
    "flex items-center justify-start text-[1.5rem] gap-1 tracking-wider font-light text-tertiary-900";
  return (
    <h1 ref={ref} className={cn(defaultClassName, className)}>
      {label}
    </h1>
  );
};

export default GraphHeader;
