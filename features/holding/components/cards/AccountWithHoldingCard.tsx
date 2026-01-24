import { convertToMoney } from "@/utils/helper-functions/formatting/convertToMoney";
import { DetailedHolding } from "@/types/api-routes/holding/holding";

const AccountWithHoldingCard = ({ holding }: { holding: DetailedHolding }) => {
  return (
    <div className="bg-white border rounded-[12px] p-4 hover:shadow-md border-tertiary-300 ">
      <div className="flex justify-between items-start gap-2">
        <div>
          <div className="text-xs sm:text-[1rem] font-medium flex items-center gap-4">
            <span className="font-medium">
              {holding.account.name}
            </span>
            <div className="flex items-center gap-1 ">
              <span className="h-[0.4rem] w-[0.4rem] rounded-full bg-tertiary-400 inline-block align-middle mx-1"></span>
              <span className="text-[0.6rem] sm:text-xs text-tertiary-600">
                {Math.floor(
                  (Date.now() - new Date(holding.updatedAt).getTime()) /
                    (1000 * 60 * 60)
                ) === 1
                  ? `1 hour ago`
                  : Math.floor(
                      (Date.now() - new Date(holding.updatedAt).getTime()) /
                        (1000 * 60 * 60)
                    ) < 1
                  ? `${Math.floor(
                      (Date.now() - new Date(holding.updatedAt).getTime()) /
                        (1000 * 60)
                    )} minutes ago`
                  : `${Math.floor(
                      (Date.now() - new Date(holding.updatedAt).getTime()) /
                        (1000 * 60 * 60)
                    )} hours ago`}
              </span>
            </div>
          </div>
          <div className="text-[0.7rem] sm:text-sm text-tertiary-700">{holding.member.name}</div>
        </div>

        <div className="text-right">
          <div className="font-medium text-xs md:text-md">
            {convertToMoney(holding.totalValue)}
          </div>
          <div className="flex flex-row gap-1 sm:text-[0.78rem] text-[0.6rem] justify-between font-medium w-full">
            <h1 className="justify-start text-tertiary-800 display flex flex-row items-center gap-2 font-light">
              Total return
            </h1>
            <span
              className={`flex gap-1 ${
                (holding?.totalReturn ?? 0) > 0
                  ? "text-secondary-1000"
                  : "text-red-600"
              }`}
            >
              <span>
                {!holding.totalReturn && "Not available"}
                {holding.totalReturn && holding?.totalReturn > 0 ? "+" : ""}
                {holding.totalReturn && convertToMoney(holding.totalReturn)}
              </span>
              <span>
                (
                {holding.totalReturn &&
                  (
                    (Math.abs(Number(holding?.totalReturn)) /
                      Number(holding?.totalValue)) *
                    100
                  ).toFixed(2)}
                %)
              </span>
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
