/**
 * Calculates the rate of change or growth.
 * 
 * @param {number} initialValue - The initial stock value.
 * @param {number} finalValue - The final stock value.
 * @returns {number} - The rate of change or growth as a percentage.
 */
export function calculateRateOfChange(initialValue: number, finalValue: number): number {
    if (initialValue === 0) {
        return 0;
    }
    const rateOfChange = ((finalValue - initialValue) / initialValue) * 100;
    return Number(rateOfChange.toFixed(2));
}
