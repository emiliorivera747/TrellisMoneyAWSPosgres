export function convertToMoney(amount: number, numberOfDecimals: number = 2): string {
    if (amount === undefined || amount === null || typeof amount !== 'number') {
        return '0.00';
    }
    return `$${amount.toFixed(numberOfDecimals).replace(/\d(?=(\d{3})+\.)/g, '$&,')}`;
}
