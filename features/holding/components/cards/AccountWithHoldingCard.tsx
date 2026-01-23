import { convertToMoney } from "@/utils/helper-functions/formatting/convertToMoney";
import { DetailedHolding } from "@/types/api-routes/holding/holding";

const AccountWithHoldingCard = ({ holding }: { holding: DetailedHolding }) => {
  return (
    <div className="bg-white border rounded-[12px] p-4 hover:shadow-md border-tertiary-300">
      <div className="flex justify-between items-start gap-2">
        
        <div>
          <div className="font-medium flex items-center gap-4">
            <span className="text-tertiary-a00 font-medium">
              {holding.account.name}
            </span>
            <div className="flex items-center gap-1">
              <span className="h-[0.4rem] w-[0.4rem] rounded-full bg-tertiary-400 inline-block align-middle mx-1"></span>
                <span className="text-xs text-tertiary-600">
                {Math.floor(
                  (Date.now() - new Date(holding.updatedAt).getTime()) /
                  (1000 * 60 * 60)
                ) < 2
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
          <div className="text-sm text-tertiary-700">{holding.member.name}</div>
        </div>

        <div className="text-right">
          <div className="font-medium">
            {convertToMoney(holding.totalValue)}
          </div>
          <div className="text-[0.8rem] text-tertiary-700">
            {holding.shares.toFixed(2)} shares
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountWithHoldingCard;
