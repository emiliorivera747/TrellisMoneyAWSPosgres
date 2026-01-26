export function generateYearsArray(
  startYear: number,
  endYear: number
): number[] {
  const years: number[] = [];
  for (let year = startYear; year <= endYear; year++) years.push(year);
  return years;
}
