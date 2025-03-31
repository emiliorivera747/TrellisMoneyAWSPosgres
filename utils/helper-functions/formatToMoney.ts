/**
 * Converts a number to a money format (e.g., 1000 -> $1k, 10000 -> $10k).
 *
 * @param value - The number to be converted.
 * @returns The formatted money string.
 */
export const formatToMoney = (value: number): string => {
    if (value >= 1_000_000_000) {
      return `$${(value / 1_000_000_000).toFixed(1)}B`;
    } else if (value >= 1_000_000) {
      return `$${(value / 1_000_000).toFixed(1)}M`;
    } else if (value >= 1_000) {
      return `$${(value / 1_000).toFixed(1)}k`;
    }
    return `$${value.toFixed(0)}`;
  };