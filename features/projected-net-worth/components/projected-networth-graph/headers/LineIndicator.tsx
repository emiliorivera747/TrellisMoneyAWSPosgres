interface LineIndicatorProps {
  color: string;
  isInflationAdjusted: boolean;
}

export const LineIndicator = ({
  color,
  isInflationAdjusted,
}: LineIndicatorProps) => (
  <div className="flex items-center gap-2 mt-[0.2rem] ml-[0.17rem]">
    <span
      style={{ backgroundColor: color }}
      className="w-[0.4rem] h-[0.14rem] rounded-full"
    />
    <span className="text-tertiary-700 font-light text-[0.75rem] hover:text-tertiary-1000 hover:underline cursor-pointer">
      {isInflationAdjusted
        ? "Adjusted for inflation"
        : "Not adjusted for inflation"}
    </span>
  </div>
);
