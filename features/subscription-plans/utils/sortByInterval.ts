import { StripePrice } from "@/features/stripe/types/price";

/**
 * Sorts two StripePrice objects based on their recurring interval in ascending order.
 * The intervals are ordered as follows: day < week < month < year.
 *
 * @param a - The first StripePrice object to compare.
 * @param b - The second StripePrice object to compare.
 * @returns A negative number if `a` should come before `b`, a positive number if `a` should come after `b`,
 *          or 0 if they are considered equal.
 *
 * @remarks
 * - If the `recurring.interval` property is missing or undefined for either object, it is treated as 0.
 * - The `order` object defines the precedence of intervals for comparison.
 *
 * @example
 * ```typescript
 * const price1 = { recurring: { interval: 'month' } } as StripePrice;
 * const price2 = { recurring: { interval: 'year' } } as StripePrice;
 * const result = sortByInterval(price1, price2); // result will be negative since 'month' < 'year'
 * ```
 */
const sortByInterval = (a: StripePrice, b: StripePrice) => {
  const order = { day: 1, week: 2, month: 3, year: 4 };
  const intervalA = a.recurring?.interval;
  const intervalB = b.recurring?.interval;
  return (
    ((intervalA && order[intervalA]) || 0) -
    ((intervalB && order[intervalB]) || 0)
  );
};

export default sortByInterval;
