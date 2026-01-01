import GraphHeaders from "@/components/headers/GraphHeaders";

/**
 * A skeleton component that serves as a placeholder for the Projected Net Worth Graph
 * while the actual data is being loaded or processed.
 *
 * This component uses Tailwind CSS classes to create a skeleton loading effect
 * with animated placeholders for the graph and its headers.
 *
 * @component
 *
 * @returns {JSX.Element} A JSX element representing the skeleton placeholder for the graph.
 *
 * @example
 * // Usage example:
 * <ProjectedNetWorthGraphSkeleton />
 *
 * @remarks
 * - The `animate-pulse` class is used to create a pulsing animation effect for the placeholders.
 * - The component is styled to match the layout and dimensions of the actual graph component.
 */
const ProjectedNetWorthGraphSkeleton = () => {
  return (
    <div className="h-full">
      <div className="flex flex-col gap-1">
        <div className="font-medium text-tertiary-900 flex items-center gap-2 justify-start">
          <GraphHeaders label={"Future Projection"} />
          <div className="bg-tertiary-200 rounded h-8 w-24 animate-pulse p-[0.2rem]"></div>
        </div>
      </div>
      <div className="h-[27rem] w-full bg-tertiary-300 rounded animate-pulse"></div>
    </div>
  );
};

export default ProjectedNetWorthGraphSkeleton;
