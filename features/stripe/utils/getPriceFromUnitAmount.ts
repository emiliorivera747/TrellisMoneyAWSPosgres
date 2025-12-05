import { RecurringInterval } from "@/features/stripe/types/price";

/**
 * Converts a unit amount (in cents) to a price (in dollars).
 *
 * @param unit_amount - The unit amount in cents. If null or undefined, the function returns 0.
 * @returns The price in dollars as a number.
 */
export const getPriceFromUnitAmount = (unit_amount: number | null) => {
  if (!unit_amount) return 0;
  return unit_amount / 100;
};

/**
 * Returns the abbreviation for a given recurring interval.
 *
 * @param interval - The recurring interval for which the abbreviation is needed.
 *                   Possible values are:
 *                   - "month": Returns "mo"
 *                   - "year": Returns "yr"
 *                   - "day": Returns "d"
 *                   - "week": Returns "wk"
 * @returns The abbreviation corresponding to the provided interval.
 */
export const getAbbreviation = (interval: RecurringInterval | null | undefined) => {
  let res;
  switch (interval) {
    case "month":
      res = `mo`;
      break;
    case "year":
      res = `yr`;
      break;
    case "day":
      res = `d`;
      break;
    case "week":
      res = `wk`;
      break;
    default:
      res = "";
  }
  return res;
};

/**
 * Generates a price description string based on the unit amount and recurring interval.
 *
 * @param unit_amount - The unit amount (e.g., price in smallest currency unit like cents).
 * @param interval - The recurring interval for the price (e.g., "month", "year").
 * @returns A formatted string representing the price and interval (e.g., "$10/month").
 */
export const getPriceDescription = (
  unit_amount: number | null ,
  interval: RecurringInterval | null | undefined
) => {
  return `$${getPriceFromUnitAmount(unit_amount)}/${getAbbreviation(interval)}`;
};
