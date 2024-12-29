export const getYearRanges = (years: number[], range: number, retirementYear: number) => {
  const ranges: { [key: string]: number[] } = {};
  years.forEach((year) => {
    const startRange = Math.floor(year / range) * range;
    const endRange = startRange + range - 1;
    const rangeKey = `${retirementYear - startRange}-${
      retirementYear - endRange
    }`;
    if (!ranges[rangeKey]) {
      ranges[rangeKey] = [];
    }
    ranges[rangeKey].push(year);
  });
  return ranges;
};
