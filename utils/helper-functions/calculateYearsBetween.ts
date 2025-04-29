/**
 *  Calculate the years between two dates
 *
 * @param startDate
 * @param endDate
 * @returns
 */
export const calculateYearsBetween = (
  startDate: Date,
  endDate: Date
): number => {
  const start = new Date(startDate);
  const end = new Date(endDate);
  let years = end.getFullYear() - start.getFullYear();
  if (years < 0) years = 0;
  return years;
};
