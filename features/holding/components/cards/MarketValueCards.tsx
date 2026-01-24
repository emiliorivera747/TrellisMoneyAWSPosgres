import { AggregateHoldingDetails } from "@/types/api-routes/holding/holding";
import { convertToMoney } from "@/utils/helper-functions/formatting/convertToMoney";
import Card from "@/components/cards/Card";
import PrimaryCardHeader from "@/components/cards/PrimaryCardHeader";
import CurrencyDisplay from "@/components/typography/CurrencyDisplay";

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
      <PrimaryCardHeader>Market value</PrimaryCardHeader>
      <CurrencyDisplay value={holding.totalValue} />
      <div className="flex flex-row gap-1 text-[0.54rem] sm:text-[0.78rem] justify-between font-medium w-full">
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
    </Card>
  );
};

export default MarketValueCards;
