export const getYearRanges = (
  years: number[],
  range: number,
  retirementYear: number
) => {
  if (!Array.isArray(years) || years.length === 0) {
    throw new Error("Years must be a non-empty array");
  }

  if (typeof range !== "number" || range <= 0) {
    throw new Error("Range must be a positive number");
  }

  if (typeof retirementYear !== "number" || retirementYear <= 0) {
    throw new Error("Retirement year must be a positive number");
  }

  return years.reduce((ranges, year) => {
    if (typeof year !== "number" || year <= 0) {
      throw new Error("Each year must be a positive number");
    }

    const startRange = Math.floor(year / range) * range;
    const endRange = startRange + range - 1;
    const rangeKey = `${retirementYear - startRange}-${
      retirementYear - endRange
    }`;

    if (!ranges[rangeKey]) {
      ranges[rangeKey] = [];
    }

    ranges[rangeKey].push(year);
    return ranges;
  }, {} as { [key: string]: number[] });
};
