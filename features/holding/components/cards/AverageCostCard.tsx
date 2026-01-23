import { AggregateHoldingDetails } from "@/types/api-routes/holding/holding";
import { convertToMoney } from "@/utils/helper-functions/formatting/convertToMoney";

// Components
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
const AverageCostCard = ({ holding }: { holding: AggregateHoldingDetails }) => {
  return (
    <Card>
      <PrimaryCardHeader>Average cost</PrimaryCardHeader>
      <CurrencyDisplay value={holding.averageCost} />
      <div className="flex flex-row gap-1 text-[0.78rem] justify-between font-medium w-full">
        <h1 className="justify-start text-tertiary-800 display flex flex-row items-center gap-2 font-light">Shares</h1>
        <span className={`gap-1 font-medium text-tertiary-800`}>
          {parseFloat(holding.shares).toFixed(2)}
        </span>
      </div>
    </Card>
  );
};

export default AverageCostCard;
