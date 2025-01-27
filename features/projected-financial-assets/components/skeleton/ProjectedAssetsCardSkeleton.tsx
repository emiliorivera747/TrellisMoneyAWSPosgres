const SkeletonLoader = () => {
  return (
    <div
      style={{
        border: "1px solid rgb(221, 221, 221)",
        scrollbarWidth: "none",
      }}
      className="max-h-screen overflow-y-auto sticky rounded-[12px] h-[35rem] "
    >
      {/* Header Skeleton */}
      <div className="font-bold text-zinc-800 flex items-center gap-1 justify-start p-4 ">
        <span className="text-sm tracking-wider h-8">
          Financial Projections{" "}
        </span>{" "}
        <div className="w-[5rem] bg-tertiary-400 rounded mb-2 h-8 animate-pulse"></div>
      </div>

      {/* Assets Table Skeleton */}
      <div className="w-full px-4 py-2 rounded-md animate-pulse">
        <div className="h-10 w-full bg-tertiary-300 rounded mb-2"></div>
        <div className="h-10 w-full bg-tertiary-300 rounded mb-2"></div>
        <div className="h-10 w-full bg-tertiary-300 rounded mb-2"></div>
        <div className="h-10 w-full bg-tertiary-300 rounded mb-2"></div>
        <div className="h-10 w-full bg-tertiary-300 rounded mb-2"></div>
        <div className="h-10 w-full bg-tertiary-300 rounded mb-2"></div>
        <div className="h-10 w-full bg-tertiary-300 rounded mb-2"></div>
        <div className="h-10 w-full bg-tertiary-300 rounded mb-2"></div>
      </div>

      {/* Submit Button Skeleton */}
      <div className="flex justify-center mt-6">
        <div className="w-32 h-14 bg-tertiary-300 rounded-md"></div>
      </div>
    </div>
  );
};

export default SkeletonLoader;
