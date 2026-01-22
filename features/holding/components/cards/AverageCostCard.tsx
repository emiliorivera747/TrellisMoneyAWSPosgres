import { AggregateHoldingDetails } from "@/types/api-routes/holding/holding";
import { convertToMoney } from "@/utils/helper-functions/formatting/convertToMoney";

/**
 * Component to display market value and total return information for a given holding.
 *
 * @param {Object} props - The component props.
 * @param {AggregateHoldingDetails} props.holding - The holding details containing market value and total return.
 * @returns {JSX.Element} A JSX element displaying the market value and total return.
 */
const AverageCostCard = ({ holding }: { holding: AggregateHoldingDetails }) => {
  return (
    <div className="pt-6 pb-8 border rounded-[12px] px-6 flex flex-col gap-4 w-[20rem] mb-6 border-tertiary-300">
      <div className="flex flex-col border-b gap-1 pb-4 border-tertiary-300">
        <h1 className="text-sm justify-start text-tertiary-1000 display flex flex-row items-center pb-2">
          Average Cost
        </h1>
        <p className="font-medium text-tertiary-1000 text-2xl">
          {convertToMoney(parseFloat(holding.averageCost))}
        </p>
      </div>
      <div className="flex flex-row gap-1 text-[0.78rem] justify-between font-medium">
        <h1 className="justify-start text-tertiary-800 display flex flex-row items-center gap-2 font-light"></h1>
        <span className={`flex gap-1 font-medium text-tertiary-800`}>
          {parseFloat(holding.shares).toFixed(2)}
          <span>Shares</span>
        </span>
      </div>
    </div>
  );
};

export default AverageCostCard;
