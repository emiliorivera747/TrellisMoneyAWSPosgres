import DateFilter from "@/features/accounts/components/filter/DateFilter";

const NetWorthGraphError = ({ error }: { error: Error | null | undefined }) => {
  return (
    <div className="relative grid grid-rows-[22rem_6rem] h-[32rem] border-b">
      <div className="flex items-center justify-center text-lg font-light text-tertiary-800">
        There was an error fetching net worth history: {error?.message}
      </div>
      <DateFilter />
    </div>
  );
};

export default NetWorthGraphError;
