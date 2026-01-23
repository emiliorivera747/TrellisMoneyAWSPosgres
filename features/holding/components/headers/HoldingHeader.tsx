import { AggregateHoldingDetails } from "@/types/api-routes/holding/holding";

/**
 * Component that renders the header for a holding.
 *
 * @param {Object} props - The component props.
 * @param {AggregateHoldingDetails} props.holding - The details of the holding to display.
 * @returns {JSX.Element} The rendered header component.
 */
const HoldingHeader = ({ holding }: { holding: AggregateHoldingDetails }) => {
  return (
    <div className="flex flex-row gap-4 tems-center text-tertiary-1000">
      <div className="font-bold text-3xl">{holding.tickerSymbol}</div>
      <div className="text-tertiary-700 text-2xl">{holding.securityName}</div>
    </div>
  );
};

export default HoldingHeader;
