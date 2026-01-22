import { AggregateHoldingDetails } from "@/types/api-routes/holding/holding";
import { convertToMoney } from "@/utils/helper-functions/formatting/convertToMoney";

/**
 * Component to display market value and total return information for a given holding.
 *
 * @param {Object} props - The component props.
 * @param {AggregateHoldingDetails} props.holding - The holding details containing market value and total return.
 * @returns {JSX.Element} A JSX element displaying the market value and total return.
 */
const MarketValueCards = ({
  holding,
}: {
  holding: AggregateHoldingDetails;
}) => {
  return (
    <div className="pt-6 pb-8 border rounded-[12px] px-6 flex flex-col gap-4 w-[20rem] mb-6 border-tertiary-300">
      <div className="flex flex-col border-b gap-1 pb-4 border-tertiary-300">
        <h1 className="text-sm justify-start text-tertiary-1000 display flex flex-row items-center gap-2">
          Market value
        </h1>
        <span className="font-semibold text-tertiary-1000 text-[1.2rem]">
          {convertToMoney(parseFloat(holding.totalValue))}
        </span>
      </div>
      <div className="flex flex-row gap-1 text-[0.78rem] justify-between font-medium">
        <h1 className="justify-start text-tertiary-700 display flex flex-row items-center gap-2">
          Total return
        </h1>
        <span
          className={`flex gap-1 ${
            Number(holding?.totalReturn) > 0
              ? "text-secondary-1000"
              : "text-red-600"
          }`}
        >
          <span>
            {Number(holding?.totalReturn) > 0 ? "+" : "-"}
            {convertToMoney(parseFloat(holding.totalReturn))}
          </span>
          <span>
            (
            {(
              (Math.abs(Number(holding?.totalReturn)) /
                Number(holding?.totalValue)) *
              100
            ).toFixed(2)}
            %)
          </span>
        </span>
      </div>
    </div>
  );
};

export default MarketValueCards;
