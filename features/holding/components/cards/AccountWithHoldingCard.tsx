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
    <div className="border rounded-[12px] p-4 hover:shadow-md border-tertiary-300">
      <div className="flex justify-between items-start gap-2">
        <div>
          <div className="text-xs sm:text-[1rem] font-medium flex items-center gap-4">
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

        <div className="text-right">
          <div className="font-medium text-xs md:text-md">
            {convertToMoney(holding.totalValue)}
          </div>
          <div className="flex flex-row gap-1 sm:text-[0.78rem] text-[0.6rem] justify-between font-medium w-full">
            <span className="justify-start text-tertiary-800 flex flex-row items-center gap-2 font-light">
              Total return
            </span>
            <span
              className={`flex gap-1 ${
                isPositiveReturn ? "text-secondary-1000" : "text-red-600"
              }`}
            >
              {hasReturn ? (
                <>
                  <span>
                    {isPositiveReturn && "+"}
                    {convertToMoney(holding.totalReturn!)}
                  </span>
                  <span>({returnPercentage}%)</span>
                </>
              ) : (
                <span>Not available</span>
              )}
            </span>
          </div>
          <div className="text-[0.6rem] sm:text-[0.8rem] text-tertiary-700">
            {holding.shares.toFixed(2)} shares
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountWithHoldingCard;
