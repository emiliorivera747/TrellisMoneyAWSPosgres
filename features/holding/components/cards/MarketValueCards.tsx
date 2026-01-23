import { AggregateHoldingDetails } from "@/types/api-routes/holding/holding";
import { convertToMoney } from "@/utils/helper-functions/formatting/convertToMoney";
import Card from "@/components/cards/Card";

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
    <Card>
      <div className="flex flex-col -1  border-tertiary-300">
        <h1 className="text-sm justify-start text-tertiary-1000 display flex flex-row items-center pb-2">
          Market value
        </h1>

        <p className="font-medium text-tertiary-1000 text-2xl">
          {convertToMoney(parseFloat(holding.totalValue))}
        </p>
      </div>

      <div className="flex flex-row gap-1 text-[0.78rem] justify-between font-medium">
        <h1 className="justify-start text-tertiary-800 display flex flex-row items-center gap-2 font-light">
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
    </Card>
  );
};

export default MarketValueCards;
