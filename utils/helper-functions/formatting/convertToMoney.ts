
/**
 * Converts a numeric amount into a formatted money string with a dollar sign,
 * commas as thousand separators, and a specified number of decimal places.
 *
 * @param amount - The numeric amount to be converted. If the value is `undefined`,
 * `null`, or not a number, the function will return "0.00".
 * @param numberOfDecimals - The number of decimal places to include in the formatted
 * string. Defaults to 2 if not provided.
 * @returns A string representing the formatted monetary value, prefixed with a
 * dollar sign (`$`), and including commas as thousand separators.
 *
 * @example
 * ```typescript
 * convertToMoney(1234567.89); // "$1,234,567.89"
 * convertToMoney(1234.5, 1); // "$1,234.5"
 * convertToMoney(0); // "$0.00"
 * convertToMoney(null); // "0.00"
 * ```
 */
export function convertToMoney(
  amount: number,
  numberOfDecimals: number = 2
): string {
  if (amount === undefined || amount === null || typeof amount !== "number")
    return "0.00";

  const isNegative = amount < 0;
  const absoluteAmount = Math.abs(amount);

  const formattedAmount = `$${absoluteAmount
    .toFixed(numberOfDecimals)
    .replace(/\d(?=(\d{3})+\.)/g, "$&,")}`;

  return isNegative ? `-${formattedAmount}` : formattedAmount;
}
