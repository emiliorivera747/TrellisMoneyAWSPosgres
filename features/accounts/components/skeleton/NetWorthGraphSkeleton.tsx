import GraphHeader from "@/components/headers/GraphHeader";

/**
 * Skeleton component for the net worth graph loading state.
 */
const NetWorthGraphSkeleton = () => {
  return (
    <div className="relative grid grid-rows-[22rem_6rem] h-[32rem] border-b">
      <div className="flex flex-col gap-1 p-4">
        <GraphHeader label="Net Worth" />
        <div className="h-[20rem] w-full bg-tertiary-300 rounded animate-pulse mt-4" />
      </div>
      <div className="flex items-center justify-center gap-2 px-4">
        {[1, 2, 3, 4, 5].map((i) => (
          <div
            key={i}
            className="h-8 w-16 bg-tertiary-200 rounded animate-pulse"
          />
        ))}
      </div>
    </div>
  );
};

export default NetWorthGraphSkeleton;
