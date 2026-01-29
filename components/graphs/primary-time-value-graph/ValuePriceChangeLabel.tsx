import numberToMoneyFormat from "@/utils/helper-functions/formatting/numberToMoneyFormat";

// Types
import { ValuePriceChangeLabelProps } from "@/types/components/admin/graphs/props";

// Utils
import { cn } from "@/lib/utils";

// Icons
import { TiArrowSortedUp } from "react-icons/ti";

/**
 *  Render the value price change label
 *
 * @param param0
 * @returns
 */
const ValuePriceChangeLabel = ({
  valueDifference,
  rateOfChange,
  ref,
  className,
  style,
}: ValuePriceChangeLabelProps) => {
  const defaultClass = "text-tertiary-1000 flex items-center gap-1";
  return (
    <span ref={ref} className={cn(defaultClass, className)} style={style}>
      <TiArrowSortedUp />
      {numberToMoneyFormat(valueDifference) +
        " (" +
        rateOfChange.toFixed(2) +
        "%) "}
    </span>
  );
};

export default ValuePriceChangeLabel;
