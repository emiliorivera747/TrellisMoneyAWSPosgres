import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { convertToMoney } from "@/utils/helper-functions/formatting/convertToMoney";
import { DetailedHolding } from "@/types/api-routes/holding/holding";

const getTimeAgo = (date: Date): string => {
  const diffMs = Date.now() - date.getTime();
  const diffMinutes = Math.floor(diffMs / (1000 * 60));
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60));

  if (diffHours < 1) return `${diffMinutes} minutes ago`;
  if (diffHours === 1) return "1 hour ago";
  return `${diffHours} hours ago`;
};

const AccountWithHoldingCard = ({ holding }: { holding: DetailedHolding }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const timeAgo = getTimeAgo(new Date(holding.updatedAt));
  const hasReturn = Boolean(holding.totalReturn);
  const isPositiveReturn = (holding.totalReturn ?? 0) > 0;
  const returnPercentage = hasReturn
    ? (
        (Math.abs(Number(holding.totalReturn)) / Number(holding.totalValue)) *
        100
      ).toFixed(2)
    : null;

  return (
    <div
      className="border rounded-[12px] p-6 hover:shadow-md border-tertiary-300 cursor-pointer transition-all"
      onClick={() => setIsExpanded(!isExpanded)}
    >
      <div className="flex justify-between items-start gap-2">
        <div className="flex flex-col gap-2">
          <div className="text-xs sm:text-[1rem] font-medium flex items-center gap-4 ">
            <span className="font-medium">{holding.account.name}</span>
            <div className="flex items-center gap-1">
              <span className="h-[0.4rem] w-[0.4rem] rounded-full bg-tertiary-400 inline-block align-middle mx-1" />
              <span className="text-[0.6rem] sm:text-xs text-tertiary-600">
                {timeAgo}
              </span>
            </div>
          </div>

          <div className="text-[0.7rem] sm:text-sm text-tertiary-700">
            {holding.member.name}
          </div>
        </div>

        <div className="flex items-center gap-2">
          <div className="font-medium text-xs sm:text-[0.9rem]">
            {convertToMoney(holding.totalValue)}
          </div>
          {isExpanded ? (
            <ChevronUp className="h-4 w-4 text-tertiary-600" />
          ) : (
            <ChevronDown className="h-4 w-4 text-tertiary-600" />
          )}
        </div>
      </div>

      {isExpanded && (
        <div className="mt-3 pt-3 border-t border-tertiary-200 flex flex-col gap-1">
          {/* Shares */}
          <div className="flex justify-between items-center mt-1 text-[0.75rem]">
            <span className="text-tertiary-800 font-light">Shares</span>
            <span className="justify-start text-tertiary-800 display flex flex-row items-center gap-2 font-light">
              {holding.shares.toFixed(2)}
            </span>
          </div>

          {/* Total Returns */}
          <div className="flex justify-between items-center text-[0.75rem]">
            <span className="justify-start text-tertiary-800 display flex flex-row items-center gap-2 font-light">
              Total return
            </span>
            <span
              className={`font-medium ${
                isPositiveReturn ? "text-secondary-1000" : "text-red-600"
              }`}
            >
              {hasReturn ? (
                <>
                  {isPositiveReturn && "+"}
                  {convertToMoney(holding.totalReturn!)} ({returnPercentage}%)
                </>
              ) : (
                "Not available"
              )}
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default AccountWithHoldingCard;
