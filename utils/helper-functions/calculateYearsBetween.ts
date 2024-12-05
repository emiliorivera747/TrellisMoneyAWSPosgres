
export function calculateYearsBetween(startDate: Date, endDate: Date): number {
    const startYear = startDate.getFullYear();
    const endYear = endDate.getFullYear();
    return endYear - startYear;
}