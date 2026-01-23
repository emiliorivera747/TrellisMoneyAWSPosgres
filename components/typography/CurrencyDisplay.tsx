import { convertToMoney } from "@/utils/helper-functions/formatting/convertToMoney";
import { cn } from "@/lib/utils";

interface CurrencyDisplayProps {
  value: string;
  ref?: React.Ref<HTMLParagraphElement>;
  className?: string;
}

const CurrencyDisplay = ({ value, ref, className }: CurrencyDisplayProps) => {
  return (
    <p
      className={cn("font-medium text-tertiary-1000 text-2xl", className)}
      ref={ref}
    >
      {convertToMoney(parseFloat(value))}
    </p>
  );
};

export default CurrencyDisplay;
